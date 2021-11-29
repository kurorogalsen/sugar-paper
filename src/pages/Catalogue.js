import React from "react";
import { useParams } from "react-router";
import AllModelCatalogue from "../components/AllModelCatalogue";
import "./../styles/catalogue.css";
function Catalogue() {
  const params = useParams();
  return (
    <main id="catalog" className="container column">
      <h2 className="container row"> Catégorie / {params.name}</h2>
      <section className="container row row-top">
        <AllModelCatalogue ctg={params.name} />
      </section>
    </main>
  );
}

export default Catalogue;
