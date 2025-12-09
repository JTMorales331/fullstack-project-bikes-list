import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { deleteBike } from "../services/bikes";

Card.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    _id: PropTypes.string,
    bike_image: PropTypes.string,
    model: PropTypes.string,
    brand: PropTypes.string,
    price: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default function Card({ className, data }) {
  const closeModalRef = useRef(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteBike,
    onSuccess: (res) => {
      closeModalRef.current?.click();

      // makes cached bikes as invalid so refetches them via useQuery
      // https://tanstack.com/query/v5/docs/framework/react/guides/query-invalidation
      queryClient.invalidateQueries({ queryKey: ["bikes"] });
    },
    onError: (err) => {
      console.error("Register Error: ", err.message);
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    mutation.mutate(data._id);
  };
  return (
    <>
      <div className={`${className} mb-4`}>
        <div className="card mb-4 box-shadow h-100 d-flex flex-column">
          {/* <img
          className="card-img-top"
          data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
          alt="Thumbnail [100%x225]"
          style={{ height: 225, width: "100%", display: "block" }}
          src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22382%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20382%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16e231e5e51%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A19pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16e231e5e51%22%3E%3Crect%20width%3D%22382%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22126.96875%22%20y%3D%22120.9%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
          data-holder-rendered="true"
        /> */}
          <div
            className="border rounded overflow-hidden"
            style={{ width: "100%", height: "full" }}
          >
            <img
              src={data.bike_image}
              alt={`${data.brand} ${data.model}`}
              className="w-100 h-100 p-3"
              style={{ objectFit: "contain" }} // apparently objectFit dooesn't exist in BS4
            />
          </div>

          <div className="card-body d-flex flex-column flex-grow-1">
            <div className="mb-3">
              <h4 className="">{data.model}</h4>

              <h5 className="text-secondary m-0">{data.brand}</h5>
            </div>

            <div className="mb-2 d-flex flex-wrap overflow-auto" style={{
              // maxHeight: "3.75rem",
              scrollbarWidth: "thin"
            }}>
              {data.tags &&
                data.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="badge border border-secondary text-dark p-2 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <div className="mt-auto d-flex justify-content-between align-items-center w-100">
              <div className="btn-group w-100">
                <Link
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  to={`bikes/${data._id}`}
                >
                  View
                </Link>
                <Link
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  to={`bikes/${data._id}/edit`}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  data-toggle="modal"
                  data-target={`#deleteModal-${data._id}`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id={`deleteModal-${data._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content" onSubmit={handleDelete}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Deleting {`${data.brand} ${data.model}`}
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
