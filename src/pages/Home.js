import React from "react";
import Baniere from "../components/Baniere";
import baniere from "./../assets/baniere.webp";
import Lastmodels from "../components/Lastmodels";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Propos from "../components/Propos";

function Home() {
  const news = {
    id: 0,
    img: { baniere },
    cta: "Découvrir nos services",
  };
  const models = [
    {
      id: 0,
      title: "Modèle fatima gold",
      imgUrl: "",
      category: "femmes",
      sousCategory: null,
      description: "Description à compléter",
      price: 19500,
    },
    {
      id: 1,
      title: "Modèle Mamadou grey",
      imgUrl: "",
      category: "hommes",
      sousCategory: "hauts",
      description: "Description à compléter",
      price: 16750,
    },
    {
      id: 2,
      title: "Modèle Sofia green",
      imgUrl: "",
      category: "femmes",
      sousCategory: null,
      description: "Description à compléter",
      price: 21500,
    },
    {
      id: 3,
      title: "Modèle Amy flowers",
      imgUrl: "",
      category: "femmes",
      sousCategory: null,
      description: "Description à compléter",
      price: 15000,
    },
  ];
  const modelshome = [
    {
      id: 0,
      title: "Kit imprimante alimentaire",
      imgUrl: " ",
      category: "kit-imprimantes",
      description: "Description à compléter",
      price: 19500,
    },
    {
      id: 1,
      title: "Papillons comestibles",
      imgUrl: " ",
      category: "produits-comestibles",
      description: "Description à compléter",
      price: 16750,
    },
    {
      id: 2,
      title: "Pâte à sucre",
      imgUrl: " ",
      category: "produits-comestibles",
      sousCategory: null,
      description: "Description à compléter",
      price: 7500,
    },
    {
      id: 3,
      title: "Ensemble douille",
      imgUrl: " ",
      category: "produits-non-comestibles",
      sousCategory: null,
      description: "Description à compléter",
      price: 5000,
    },
  ];
  console.log(news[0]);
  return (
    <main id="main">
      <Baniere new={news} />
      <Propos />
      <Services />
      <section style={{ padding: "10px", backgroundColor: "var(--grey-color)" }} className="container row">
        <div className="title container row">
          <h3>Quelques produits</h3>
        </div>
        <Lastmodels models={modelshome} />
      </section>
      <Testimonials />
    </main>
  );
}

export default Home;
