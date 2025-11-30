import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
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

  useEffect(() => {
    console.log({ errors });
  }, [errors]);

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
    // const newData = { ...data, tags };

    // let hasError = false;

    // // tags
    // if (
    //   !data.tags ||
    //   data.tags.length === 0 ||
    //   data.tags.some((tag) => !tag.trim())
    // ) {
    //   setError("tags", {
    //     type: "manual",
    //     message: "Please add at least one tag",
    //   });
    //   // hasError = true;
    //   return;
    // }

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

  return (
    <form className="form-bike" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-4 font-weight-normal text-center">Create a bike</h1>

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
            onChange={(e) => {
              clearErrors("brand");
            }}
            autoFocus
            {...register("brand", { required: "Brand is required" })}
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
            onChange={(e) => {
              clearErrors("model");
            }}
            autoFocus
            {...register("model", { required: "Model is required" })}
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
            onChange={(e) => {
              clearErrors("size");
            }}
            autoFocus
            {...register("size", { required: "Size is required" })}
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
            onChange={(e) => {
              clearErrors("color");
            }}
            autoFocus
            {...register("color", { required: "Color is required" })}
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
            onChange={(e) => {
              clearErrors("price");
            }}
            autoFocus
            {...register("price", { required: "Price is required" })}
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
          onChange={(e) => {
            clearErrors("bike_image");
          }}
          autoFocus
          {...register("bike_image", { required: "Image URL is required" })}
        />
        {errors.bike_image && (
          <div className="text-danger">{errors.bike_image.message}</div>
        )}
      </div>

      {/* <div className="mb-5">
        <label htmlFor="tag" className="form-label">
          Add a tag
        </label>
        <div className="d-flex items-center">
          <input
            type="text"
            id="tag"
            // value={tagInput}
            // onChange={(e) => setTagInput(e.target.value)}
            className="form-control flex-grow-1"
            placeholder="all-around"
            autoFocus
          />
          <button
            className="btn flex-shrink-0 btn-secondary"
            onClick={() => append("")}
          >
            Add
          </button>
        </div>

        <div className="d-flex flex-wrap">
          {fields.map((tag, index) => {
            return (
              <span
                key={tag.id}
                name={`tag.${index}`}
                {...register(`tags.${index}`, { required: true })}
                defaultValue={tag.value}
              >
                {tag}
                <button
                  type="button"
                  className="btn close"
                  aria-label="Remove"
                  onClick={() => remove(index)}
                >
                  X
                </button>
              </span>
            );
          })}
        </div>
      </div> */}

      <div className="row">
        <div className="mb-5 col-12 col-md-3">
          <label htmlFor="tag" className="form-label flex-shrink-0">
            Add a tag
          </label>
          <div className="d-flex align-items-center mb-2">
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

          {/* <div className="d-flex align-items-center"></div> */}

          <ul className="p-0">
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
          {errors.tags && (
            <div className="text-danger">{errors.tags.root?.message}</div>
          )}
        </div>
      </div>

      <button className="btn btn-lg btn-primary w-100 w-lg-auto" type="submit">
        Submit bike
      </button>
      {mutation.isError && (
        <p className="text-danger">Invalid posting of bike. Please try again</p>
      )}
    </form>
  );
}
