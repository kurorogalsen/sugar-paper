import React from 'react';
import omar from "./../assets/omar.jpeg";
function Propos() {
    return (
        <div id="propos" className="container column" style={{padding: "10px", marginTop: "25px", marginBottom: "25px"}}>
            <img style={{borderRadius:"100%", border:"5px solid var(--primary-color)", margin:"10px"}} className="col-7 col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-2" src={omar} alt="Omar" />
            <div className="title container row">
                <h3>Omar</h3>
            </div>
            <p className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-7">Nous sommes spécialisés dans la vente d’imprimantes alimentaires pour personnaliser vos gâteaux, de feuilles comestibles (sucre et azyme), de cartouches comestibles. Pour réaliser de meilleures gâteaux, amateurs comme professionnels ont bien souvent besoin des meilleurs ingrédients, dont la qualité est déterminante pour le résultat final. C'est pourquoi Sugar Paper a soigneusement sélectionné sa gamme de produits pâtissiers, pour rendre accessibles à tous des produits de qualité professionnelle au meilleur prix.</p>
        </div>
    )
}

export default Propos
