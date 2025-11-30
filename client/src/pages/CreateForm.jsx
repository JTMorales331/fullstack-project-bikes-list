import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postBike } from "../services/bikes";
import "../css/form.css";
// react hook form
// react hook query

// DO NOT DO ALL THE DATA I GUESS IDK LETS TRY HEHEHEHEHE

export default function CreateForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Add the tag input into tags
  function handleAddTag(e) {
    e.preventDefault();

    const trimmedTag = tagInput.trim();

    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }

    setTagInput("");
  }

  // Remove the tag from tags
  function handleRemoveTag(tagToRemove) {
    // e.preventDefault();
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  function onSubmit(data) {
    const newData = { ...data, tags };
    console.log(newData);

    // submit the data to the mutated postBike function
    mutation.mutate(newData);
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
            autoFocus
            {...register("brand", { required: true })}
          />
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
            {...register("model", { required: true })}
          />
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
            autoFocus
            {...register("size", { required: true })}
          />
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
            {...register("color", { required: true })}
          />
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
            {...register("price", { required: true })}
          />
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
          {...register("bike_image", { required: true })}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="bikeImage" className="form-label">
          Add a tag
        </label>
        {/* Input for the tag */}
        <div className="d-flex items-center">
          <input
            type="text"
            id="bikeImage"
            onChange={(e) => setTagInput(e.target.value)}
            className="form-control flex-grow-1"
            placeholder="all-around"
            autoFocus
            // {...register("bike_image", { required: true })}
          />
          <button
            className="btn flex-shrink-0 btn-secondary"
            onClick={handleAddTag}
          >
            Add
          </button>
        </div>

        {/* tag list */}
        <div className="d-flex flex-wrap">
          {tags.map((tag, index) => {
            return (
              <span key={index}>
                {tag}
                <button
                  type="button"
                  className="btn close"
                  aria-label="Remove"
                  onClick={() => handleRemoveTag(tag)}
                >
                  X
                </button>
              </span>
            );
          })}
        </div>
      </div>

      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Submit bike
      </button>
      { 
        mutation.isError && (
          <p className="mt-1 text-danger">Invalid posting of bike. Please try again</p>
        )
      }
    </form>
  );
}
