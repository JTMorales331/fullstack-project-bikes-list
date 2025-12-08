import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { postBike } from "../services/bikes";
import "../css/form.css";
// react hook form
// react hook query

// DO NOT DO ALL THE DATA I GUESS IDK LETS TRY HEHEHEHEHE

export default function CreateForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: { tags: [] },
  });

  // useFieldArray for dynamic arrays
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "tags", // unique name for your Field Array
      rules: {
        required: "Please have at least one tag",
      },
    }
  );

  // const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

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

  function onSubmit(data) {
    // if (hasError) return;
    console.log(data);

    // submit the data to the mutated postBike function
    mutation.mutate(data);
  }

  // send data to /api/bikes
  const mutation = useMutation({
    mutationFn: postBike,
    onSuccess: (res) => {
      console.log("bike posted: ", res);
      navigate("/");
    },
    onError: (err) => {
      console.error("Submission error: ", err.message);
    },
  });

  const isValidImageUrl = (url) => {
    if (!url || url.trim() === "") return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <form className="form-bike" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-4 font-weight-normal text-center">Create a bike</h1>
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
                autoFocus
                {...register("model", {
                  required: "Model is required",
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
                autoFocus
                {...register("color", {
                  required: "Color is required",
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
                Price
              </label>
              <input
                type="text"
                id="price"
                className="form-control"
                placeholder="6799"
                autoFocus
                {...register("price", {
                  required: "Price is required",
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
              autoFocus
              {...register("bike_image", {
                required: "Image URL is required",
                onChange: () => clearErrors("bike_image"),
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
              {/* <button
            className="btn btn-secondary ms-2"
            onClick={handleAddTag}
            type="button"
          >
            Add
          </button> */}
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
                        required: "Either delete this or just delete it, bro.",
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
        >
          Submit bike
        </button>
        <Link className="btn btn-lg btn-secondary w-100 w-lg-auto" to="/">
          Cancel
        </Link>
      </div>

      {mutation.isError && (
        <p className="text-danger">Invalid posting of bike. Please try again</p>
      )}
    </form>
  );
}
