import React from 'react';
import "./../styles/services.css";

function Services() {
    return (
        <div id="services" style={{ backgroundColor: "var(--secondary-color" }} className="container row">
            <div className="title container row">
                <h3>Nos services</h3>
            </div>
            <div className="container row">
                <div className="service-img col-6 col-sm-4 col-md-3 col-xl-2">
                    <img src="https://galsendigitalagency.com/sugar-paper/4.png" alt="" />
                    <p>Vente de kit imprimante alimentaire </p>
                </div>
                <div className="service-img col-6 col-sm-4 col-md-3 col-xl-2">
                    <img src="https://galsendigitalagency.com/sugar-paper/5.png" alt="" />
                    <p>impression sur feuille comestible </p>
                </div>
                <div className="service-img col-6 col-sm-4 col-md-3 col-xl-2">
                    <img src="https://galsendigitalagency.com/sugar-paper/6.png" alt="" />
                    <p>Produits comestibles  </p>
                </div>
                <div className="service-img col-6 col-sm-4 col-md-3 col-xl-2">
                    <img src="https://galsendigitalagency.com/sugar-paper/7.png" alt="" />
                    <p>Produits non comestibles </p>
                </div>
                <div className="service-img col-6 col-sm-4 col-md-3 col-xl-2">
                    <img src="https://galsendigitalagency.com/sugar-paper/8.png" alt="" />
                    <p>vente Cartouches alimentaires </p>
                </div>
            </div>
        </div>
    )
}

export default Services
