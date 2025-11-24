import React, { useEffect } from "react";
import "../css/main.css";
import "font-awesome/css/font-awesome.min.css";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";

const Main = () => {
  function getCards() {
    const { data, isPending, error } = useQuery({
      queryKey: ["bikes"],
      queryFn: () =>
        fetch("http://localhost:3000/api/bikes").then((r) => r.json()),
    });

    if (isPending) return <span>Loading...</span>;
    if (error) return <span>Oops!</span>;
    // console.log({data})
    return data.map((card, index) => {
      console.log(card)
      return <Card key={index} image={card.bike_image} brand={card.brand} model={card.model} tags={card.tags} className="col-md-4" />;
    });
  }

  return (
    <div>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search this site"
            />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            { getCards() }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
