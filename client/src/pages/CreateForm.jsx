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

  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState("")

  function handleAddTag(e) {

  }

  function handleRemoveTag(e) {
    
  }

  function onSubmit(data) {
    console.log({ data });

    // submit the data to the mutated postBike function
    // mutation.mutate(data);
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
    </form>
  );
}
