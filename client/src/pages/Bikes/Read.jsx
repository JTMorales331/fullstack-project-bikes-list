import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { deleteBike } from "../../services/bikes";

export default function Details() {
  // tried using react-router's loader and errorElement
  const queryClient = useQueryClient();
  const bike = useLoaderData();

  const navigate = useNavigate();
  const modalRef = useRef(null);
  const closeModalRef = useRef(null);
  const openModalRef = useRef(null);

  console.log(bike);

  const handleClick =() => {
    console.log(modalRef.current?.role)
  }

  const mutation = useMutation({
    mutationFn: deleteBike,
    onSuccess: (responseBody) => {
      console.log("Register success!", responseBody);

      closeModalRef.current?.click();
      queryClient.invalidateQueries({queryKey: ["bikes"]})
      navigate("/");
    },
    onError: (err) => {
      console.error("Register Error: ", err.message);
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    mutation.mutate(bike._id);
  };
  return (
    <>
      <div className="container py-5">
        <Link to="/" className="btn btn-outline-secondary mb-4">
          ← Back to bikes
        </Link>

        <div className="row">
          <div className="col-md-6">
            <div
              className="border rounded overflow-hidden"
              style={{ width: "100%", height: "full" }}
            >
              <img
                src={bike.bike_image}
                alt={`${bike.brand} ${bike.model}`}
                className="w-100 h-100 p-3"
                style={{ objectFit: "cover" }} // apparently objectFit dooesn't exist in BS4
              />
            </div>
          </div>

          <div className="col-md-6">
            <h1>{bike.model}</h1>
            <h3 className="text-secondary">{bike.brand}</h3>

            <hr />

            <p className="mb-2">
              <strong>Size:</strong> {bike.size}
            </p>
            <p className="mb-2">
              <strong>Color:</strong> {bike.color}
            </p>
            {bike.date_sold && (
              <p className="mb-2">
                <strong>Date Sold:</strong>{" "}
                {new Date(bike.date_sold).toLocaleDateString()}
              </p>
            )}

            <h4 className="mt-4 mb-3">${bike.price.toFixed(2)}</h4>

            <div className="mt-3 mb-4">
              <strong>Tags:</strong>
              <div className="mt-2">
                {bike.tags &&
                  bike.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="badge badge-secondary mr-2 mb-2 p-2"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>

            <div className="text-muted small">
              <p className="mb-1">
                Created: {new Date(bike.created_at).toLocaleString()}
              </p>
              <p className="mb-1">
                Updated: {new Date(bike.updated_at).toLocaleString()}
              </p>
            </div>

            <div className="mt-4">
              <Link to={`edit`} className="btn btn-primary mr-2">Edit</Link>
              <button
                type="button"
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#deleteModal"
                ref={openModalRef}
                // onClick={handleClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        // ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content" onSubmit={handleDelete}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Deleting {`${bike.brand} ${bike.model}`}
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
            <div className="modal-body">Are you sure you want to delete?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleClick}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Deleting..." : "Confirm Deletion"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
