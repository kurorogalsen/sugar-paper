import React from "react";
import { Link } from "react-router-dom";
function DynamicLinks({ list }) {
  return list.map((element) => (
    <li className="dropdownli">
      <Link to={"/catalogue/" + element.name}>{element.name}</Link>
    </li>
  ));
}

export default DynamicLinks;
