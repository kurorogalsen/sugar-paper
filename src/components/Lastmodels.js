import React from "react";
import "./../styles/lastmodels.css";
import { Link } from "react-router-dom";

function Lastmodels({ models }) {
  const chemins = models.map(
    (model) => "https://galsendigitalagency.com/sugar-paper/" + model.id + ".png"
  );

  return models.map((model) => (
    <div style={{backgroundColor:"var(--grey-color)", padding:"10px"}} className="fr-model col-6 col-md-3 col-xl-2 row">
      <div className="container column">
        <img className="container" src={chemins[model.id]} alt={model.title} />
        <p className="container row"> {model.title} </p>
        <p className="container row"> {model.price} CFA </p>
        <Link to={"/catalogue/" + model.category}>
          {" "}
          <button className="fr-btn"> AJOUTER AU PANIER </button>
        </Link>
      </div>
    </div>
  ));
}

export default Lastmodels;
