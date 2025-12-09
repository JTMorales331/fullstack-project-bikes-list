import { useEffect } from "react";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBike } from "../../services/bikes";
import BikeForm from "./Form";

export default function Update() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const bike = useLoaderData();

  useEffect(() => {
    console.log("bike: ", bike);
  }, [bike]);

  const mutation = useMutation({
    mutationFn: ({ id, data }) => updateBike(id, data),
    onSuccess: (res) => {
      console.log("bike posted: ", res);
      queryClient.invalidateQueries({ queryKey: ["bikes"] });
      navigate(`/bikes/${res._id}`);
    },
    onError: (err) => {
      console.error("Submission error: ", err.message);
    },
  });

  function onSubmit(data) {
    console.log(data);

    mutation.mutate({ id: bike._id, data });
  }

  return (
    <section className="form-bike container py-5">
      <div className="text-start mb-4">
        <h3 className="text-secondary">Update</h3>
        <h1 className="h1 font-weight-normal">
          {bike.brand} {bike.model}
        </h1>
      </div>
      <BikeForm
        onSubmit={onSubmit}
        defaultValues={bike}
        isSubmitting={mutation.isPending}
        submitError={mutation.isError}
        submitButtonText="Submit Bike"
      />
    </section>
  );
}
