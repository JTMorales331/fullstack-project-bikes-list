import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import "../../css/form.css";
import PropTypes from "prop-types";
// react hook form
// react hook query

// DO NOT DO ALL THE DATA I GUESS IDK LETS TRY HEHEHEHEHE

BikeForm.propTypes = {
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  submitError: PropTypes.bool,
  submitButtonText: PropTypes.string,
};

export default function BikeForm({
  defaultValues = { tags: [] },
  onSubmit,
  isSubmitting = false,
  submitError = null,
  submitButtonText = "Submit",
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "all",
    // the different validation trigger modes:
    // "onChange" = only on change
    // "onSubmit" = default only on submit
    // "onBlur" = validation on blur
  });

  const closeModalRef = useRef(null);
  const openModalRef = useRef(null);
  // useFieldArray for dynamic arrays
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "tags", // unique name for your Field Array
    rules: {
      required: "Please have at least one tag",
    },
  });

  // const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [pendingData, setPendingData] = useState(null);
  // const [imageError, setImageError] = useState(false);

  const brand = watch("brand");
  const model = watch("model");
  const bike_image = watch("bike_image");

  // Add the tag input into tags
  function handleAddTag(e) {
    e.preventDefault();

    const trimmedTag = tagInput.trim();

    if (trimmedTag && !fields.some((field) => field.value === trimmedTag)) {
      append(trimmedTag);
      setTagInput("");
      clearErrors("tags");
    }
  }

  // Remove the tag from tags
  function handleRemoveTag(index) {
    // e.preventDefault();
    // setTags(tags.filter((tag) => tag !== tagToRemove));
    remove(index);

    clearErrors("tags");
  }

  const isValidImageUrl = (url) => {
    if (!url || url.trim() === "") return false;
    try {
      new URL(url);
      return /^https?:\/\/.+\.(webp)$/i.test(url);
    } catch {
      return false;
    }
  };

  const handleFormSubmit = (data) => {
    setPendingData(data);

    // Validate specific field
    // trigger("brand");

    // Validate all fields if we are to not use form submittion
    // trigger();

    openModalRef.current?.click();
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (pendingData) {
      closeModalRef.current?.click();
      onSubmit(pendingData);
      setPendingData(null);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              {/* brand */}
              <div className="col-md-6 mb-3">
                <label htmlFor="brand" className="form-label">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  className="form-control"
                  placeholder="Giant"
                  autoFocus
                  {...register("brand", {
                    required: "Brand is required",
                    minLength: {
                      value: 2,
                      message: "Must be atleast 3 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "Must be at most 100 characters",
                    },
                    onChange: () => clearErrors("brand"),
                  })}
                />
                {errors.brand && (
                  <div className="text-danger">{errors.brand.message}</div>
                )}
              </div>

              {/* Model */}
              <div className="col-md-6 mb-3">
                <label htmlFor="model" className="form-label">
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  className="form-control"
                  placeholder="TCR Advanced"
                  {...register("model", {
                    required: "Model is required",
                    minLength: {
                      value: 3,
                      message: "Must be atleast 3 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "Must be at most 100 characters",
                    },
                    onChange: () => clearErrors("model"),
                  })}
                />
                {errors.model && (
                  <div className="text-danger">{errors.model.message}</div>
                )}
              </div>
            </div>

            <div className="row">
              {/* Size */}
              <div className="col-md-4 mb-3">
                <label htmlFor="model" className="form-label">
                  Size
                </label>
                <input
                  type="text"
                  id="size"
                  className="form-control"
                  placeholder="54cm / M/L"
                  {...register("size", {
                    required: "Size is required",
                    onChange: () => clearErrors("size"),
                  })}
                />
                {errors.size && (
                  <div className="text-danger">{errors.size.message}</div>
                )}
              </div>
              {/* Color */}
              <div className="col-md-4 mb-3">
                <label htmlFor="color" className="form-label">
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  className="form-control"
                  placeholder="Black / Blue"
                  {...register("color", {
                    required: "Color is required",
                    minLength: {
                      value: 3,
                      message: "Must be atleast 3 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "Must be at most 100 characters",
                    },
                    onChange: () => clearErrors("color"),
                  })}
                />
                {errors.color && (
                  <div className="text-danger">{errors.color.message}</div>
                )}
              </div>
              {/* price */}
              <div className="col-md-4 mb-3">
                <label htmlFor="color" className="form-label">
                  Price $
                </label>
                <input
                  type="text"
                  id="price"
                  className="form-control"
                  placeholder="6799"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Must be atleast 0"
                    },

                    onChange: () => clearErrors("price"),
                  })}
                />
                {errors.price && (
                  <div className="text-danger">{errors.price.message}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="bikeImage" className="form-label">
                Bike Image URL
              </label>
              <input
                type="text"
                id="bikeImage"
                className="form-control"
                placeholder="http://example.web"
                {...register("bike_image", {
                  required: "Image URL is required",
                  onChange: () => clearErrors("bike_image"),
                  validate: {
                    isValidUrl: (value) =>
                      isValidImageUrl(value) ||
                      "Please enter valid URL (.webp)",
                  },
                })}
              />
              {errors.bike_image && (
                <div className="text-danger">{errors.bike_image.message}</div>
              )}
            </div>

            <div className="">
              <label htmlFor="tag" className="form-label flex-shrink-0">
                Add a tag
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  id="tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="form-control flex-grow-1"
                  placeholder="all-around"
                />

                <button
                  type="button"
                  className="btn btn-info"
                  disabled={tagInput.length === 0}
                  onClick={handleAddTag}
                >
                  Add
                </button>
              </div>
              {errors.tags && (
                <div className="text-danger">{errors.tags.root?.message}</div>
              )}

              {/* <div className="d-flex align-items-center"></div> */}

              <ul className="p-0 mt-2">
                {fields.map((item, index) => (
                  <li
                    key={item.id}
                    className="list-unstyled d-flex flex-column mb-3"
                  >
                    <div className="d-flex align-items-center">
                      <input
                        name={`tags.${index}`}
                        // control={control}
                        className="flex-grow-1 form-control"
                        placeholder="carbon"
                        defaultValue={item.value || item}
                        {...register(`tags.${index}`, {
                          required:
                            "Either delete this or just delete it, bro.",
                        })}
                      />
                      <button
                        type="button"
                        className="flex-shrink-0 btn btn-danger"
                        onClick={() => handleRemoveTag(index)}
                      >
                        Delete
                      </button>
                    </div>
                    {errors?.tags?.[index] && (
                      <div className="text-danger">
                        {errors?.tags[index]?.message}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-6 h-full">
            <label className="form-label d-block">Bike Preview</label>
            <div
              className="border rounded max-height overflow-hidden d-flex justify-content-center align-items-center"
              style={{ width: "100%", height: "full", minHeight: "13rem" }}
            >
              {isValidImageUrl(bike_image) && !errors.bike_image ? (
                <img
                  src={bike_image}
                  alt={`Preview of ${brand || "bike"} ${model || ""}`}
                  className="w-100 h-100 p-3"
                  style={{ objectFit: "contain", maxHeight: "400px" }}
                />
              ) : bike_image && bike_image.trim() !== "" ? (
                <p className="text-danger text-center px-3">
                  {errors.bike_image
                    ? "Failed to load image. Please check the URL."
                    : "Invalid URL format"}
                </p>
              ) : (
                <p className="text-muted text-center">
                  Image preview will appear here
                </p>
              )}
            </div>
          </div>
        </div>

        <div
          className="d-flex flex-column flex-lg-row justify-content-between align-items-center"
          role="group"
        >
          <button
            className="btn btn-lg btn-primary w-100 w-lg-auto mb-3 mb-lg-0 mr-lg-3"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : submitButtonText}
          </button>
          <Link className="btn btn-lg btn-secondary w-100 w-lg-auto" to="/">
            Cancel
          </Link>
        </div>

        {submitError && (
          <p className="text-danger">
            Invalid posting of bike. Please try again
          </p>
        )}

        <button
          ref={openModalRef}
          type="button"
          className="d-none"
          data-toggle="modal"
          data-target="#confirmModal"
        >
          Open Modal
        </button>
      </form>

      {/* Modal */}
      <div
        className="modal fade"
        id="confirmModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        // ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content" onSubmit={handleConfirm}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirm Submission
              </h5>
              <button
                ref={closeModalRef}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">Are you sure you want to submit?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                // onClick={handleClick}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
