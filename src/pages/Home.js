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
  return (
    <main id="main">
      <Baniere new={news} />
      <Propos />
      <Services />
      <section style={{ padding: "10px", backgroundColor: "var(--grey-color)" }} className="container row">
        <div className="title container row">
          <h3>Quelques produits</h3>
        </div>
        <Lastmodels />
      </section>
      <Testimonials />
    </main>
  );
}

export default Home;
