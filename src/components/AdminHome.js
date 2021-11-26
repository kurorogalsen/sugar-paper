import React, { useState, useEffect } from "react";
import "./../styles/admin.css";
import CrudCollection from "./CrudCollection";
import CrudCtg from "./CrudCtg";
import CrudArticle from "./CrudArticle";
import Client from "./Client";
import Commande from "./Commande";
function AdminHome() {

  const [ctg, setCtg] = useState(true);
  const [article, setarticle] = useState(false)
  const [collection, setcollection] = useState(false)
  const [commande, setcommande] = useState(false)
  const [client, setclient] = useState(false)
  function changerMenu() {
    setCtg(false);
    setarticle(false);
    setcollection(false);
    setcommande(false);
    setclient(false);
    return 0;
  }
  /* 
    const categorie = [
      {
        id: 0,
        libelle: "Matériel comestible",
      },
      {
        id: 1,
        libelle: "Matériel non comestible",
      },
      {
        id: 2,
        libelle: "Impression comestible",
      },
      {
        id: 3,
        libelle: "Cartouches alimentaires",
      },
      {
        id: 4,
        libelle: "Kit imprimante alimentaire",
      },
    ] */
  return <div className="container row row-top row-between" id="admin-home">
    <div className="column col-12 col-lg-2" id="admin-menu">
      <header className="container row">
        Menu
      </header>
      <nav className="container column">
        <ul className="container">
          <li onClick={() => {changerMenu(); setCtg(true)}} className="container menu-list">Catégorie</li>
          <li onClick={() => {changerMenu(); setarticle(true)}} className="container menu-list">Article</li>
          <li onClick={() => {changerMenu(); setcollection(true)}} className="container menu-list">Collection</li>
          <li onClick={() => {changerMenu(); setcommande(true)}} className="container menu-list">Commande</li>
          <li onClick={() => {changerMenu(); setclient(true)}} className="container menu-list">Client</li>
        </ul>
      </nav>
    </div>

    <div className="col-12 col-lg-9 col-xxl-8 column column-left" id="admin-info">
      <div className="container column" id="admin-action">

      {ctg ? <CrudCtg /> : ""}
      {collection ? <CrudCollection /> : ""}
      {article ? <CrudArticle /> : ""}
      {client ? <Client /> : ""}
      {commande ? <Commande /> : ""}
      </div>

    </div>
  </div>;
}

export default AdminHome;
