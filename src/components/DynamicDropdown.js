import React from "react";
import { Link } from "react-router-dom";

function DynamicDropdown({ listsousCtg }) {
  let i = 0;
  if (listsousCtg != null) {
    return listsousCtg.map((ctg) => (
      <li key={i++} className="dropdownli">
        <Link to={"/catalogue/" + ctg.parent}>
          {ctg.name}
        </Link>
      </li>
    ));
  } else return "";
}

export default DynamicDropdown;
