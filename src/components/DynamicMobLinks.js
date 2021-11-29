import React from "react";
import { Link } from "react-router-dom";

function DynamicMobLinks({ list }) {
  return list.map((element) => (
    <Link to={"/catalogue/" + element.nom_categorie}>
      <li className="fr-li"> {element.nom_categorie} </li>
    </Link>
  ));
}

export default DynamicMobLinks;
