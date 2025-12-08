import { useState } from "react";
import "../css/main.css";
import "font-awesome/css/font-awesome.min.css";
import { useQuery } from "@tanstack/react-query";
import Card from "../components/Card";
import { useLoaderData } from "react-router-dom";
import { getBikes, deleteBike } from "../services/bikes";

const Main = () => {

  const [query, setQuery] = useState("");

  const {
    data: bikes = [], // to avoid empty array (I think can not survive without TS due to edge cases detection)
    isPending,
    isError, // WE NEED ISERROR
    error,
  } = useQuery({
    queryKey: ["bikes", query],
    queryFn: () => getBikes(query),
  });

  // const bikes = useLoaderData();

  return (
    <>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search this site"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
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
            {/* {GetCards()} */}
            {isPending && <span>Loading...</span>}
            {isError && <span>Oops! got an error: {error}</span>}
            {!isPending &&
              bikes &&
              (bikes.length > 0 ? (
                bikes.map((card, index) => {
                  console.log(card);
                  return <Card key={card._id} data={card} className="col-md-4" />;
                })
              ) : (
                <span className="text-center">No bikes found in search</span>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
