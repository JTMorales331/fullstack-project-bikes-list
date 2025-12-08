import React from "react";
import { useLoaderData, Link } from "react-router-dom";

export default function BikeDetails() {
  // tried using react-router's loader and errorElement
  const bike = useLoaderData();
  console.log(bike);
  return (
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
            <button className="btn btn-primary mr-2">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
