import { useNavigate } from "react-router-dom";
import { postBike } from "../../services/bikes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../../css/form.css";
import BikeForm from "./Form";
import { useRef } from "react";

export default function CreateBike() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // send data to /api/bikes
  const mutation = useMutation({
    mutationFn: postBike,
    onSuccess: (res) => {
      console.log("bike posted: ", res);
      queryClient.invalidateQueries({ queryKey: ["bikes"] });

      navigate(`/bikes/${res._id}`);
    },
    onError: (err) => {
      console.error("Submission error: ", err.message);
    },
  });

  const handleSubmit = (data) => {
    console.log("clicked!: ", data)
    mutation.mutate(data);
    // navigate(`/bikes/${data._id}`);
  };

  return (
    <>
      <section className="form-bike container">
        <div className="text-start mb-4">
          {/* <h3 className="text-secondary">Create</h3> */}
          <h1 className="h1 font-weight-normal">Create a new bike</h1>
        </div>
        <BikeForm
          onSubmit={handleSubmit}
          isSubmitting={mutation.isPending}
          submitError={mutation.isError}
          submitButtonText="Submit Bike"
        />
      </section>
    </>
  );
}
