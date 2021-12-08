import React from 'react';
import "./../styles/services.css";
import img4 from "./../assets/models/4.webp";
import img5 from "./../assets/models/5.webp";
import img6 from "./../assets/models/6.webp";
import img7 from "./../assets/models/7.webp";
import img8 from "./../assets/models/8.webp";

function Services() {
    return (
        <div id="services" style={{ backgroundColor: "var(--secondary-color" }} className="container row">
            <div className="title container row">
                <h3>Nos services</h3>
            </div>
            <div className="container row">
                <div className="service-img col-6 col-sm-4 col-md-3 col-xl-2">
                    <img src={img4} alt="" />
                    <p>Vente de kit imprimante alimentaire </p>
                </div>
                <div className="service-img col-6 col-sm-4 col-md-3 col-xl-2">
                    <img src={img5} alt="" />
                    <p>Impression sur feuille comestible </p>
                </div>
                <div className="service-img col-6 col-sm-4 col-md-3 col-xl-2">
                    <img src={img6} alt="" />
                    <p>Produits comestibles  </p>
                </div>
                <div className="service-img col-6 col-sm-4 col-md-3 col-xl-2">
                    <img src={img7} alt="" />
                    <p>Outils de pâtisserie </p>
                </div>
                <div className="service-img col-6 col-sm-4 col-md-3 col-xl-2">
                    <img src={img8} alt="" />
                    <p>Vente Cartouches alimentaires </p>
                </div>
            </div>
        </div>
    )
}

export default Services
