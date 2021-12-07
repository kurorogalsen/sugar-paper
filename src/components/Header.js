import React, { useEffect, useState } from 'react'
import axios from "axios"; import Navbar from "./Navbar";
import logo from "./../assets/logo.png";
import loupe from "./../assets/icons/loupe.png";
import cart from "./../assets/icons/cart.png";
import { Link } from "react-router-dom";
import "./../styles/header.css";

function Header() {

  /* GET ARTICLES */
  const [dataArticle, setdataArticle] = useState([])
  const allArticle = () => {
    axios.get('http://sugar-paper.com/article').then((response) => {
      setdataArticle(response.data);
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    allArticle();
  }, [])

  /* Calcul TOTAL */
  let total = 0;
  dataArticle.map((article) => (
    localStorage[article.id] ? total += localStorage[article.id] * article.prix_article : ""
  ))

  const [loading_recherche, setLoading_recherche] = useState(false)
  const [recherche, setRecherche] = useState("")
  function rechercher(e) {
    e.preventDefault();
    let recherche_value = document.getElementById("recherche_value").value;
    setRecherche(recherche_value);
    setLoading_recherche(!recherche);
  }
  return (
    <header id="header" className="container column">
      <span id="scrollUpAnchor"></span>
      <div id="header-gradient" className="container column"></div>
      <div id="header-welcome" className="container column">
        <h3>Dalal ak diam - Bienvenue - Welcome</h3>
        <p>Achetez et faites vous livrer dans les plus bref délais</p>
      </div>
      <div
        style={{ backgroundColor: "var(--grey-color)" }}
        className="container row"
        id="main-header"
      >
        <img width="75" src={logo} alt="Logo Sugar Paper" />

        <form className="row-between" id="search-bar">
          <input id="recherche_value" onChange={(e) => { rechercher(e) }} type="search" placeholder="Rechercher un produit..." />
          <Link to={loading_recherche ? "/search/" + recherche : "/search/" + recherche}>
            <button style={{border: "none", outline: "none", backgroundColor: "transparent", cursor: "pointer"}} type="submit">
              <img width="20" src={loupe} alt="loupe" />
            </button>
          </Link>

        </form>

        <div id="header-pan" className="row">
          <Link to="/panier">
            <img width="20" src={cart} alt="panier" />
          </Link>
          <div id="total-panier">{total} {'CFA'}</div>
        </div>

        <div id="header-sm" className="row">
          <a
            className="row"
            rel="noreferrer"
            target="_blank"
            href="https://web.facebook.com/"
          >
            {" "}
            <img
              src="https://img.icons8.com/material-two-tone/24/000000/facebook-f--v1.png"
              alt="facebook"
            />{" "}
          </a>
          <a
            className="row"
            rel="noreferrer"
            target="_blank"
            href="https://www.instagram.com/sugarpaper1/"
          >
            {" "}
            <img
              src="https://img.icons8.com/glyph-neue/24/000000/instagram-new.png"
              alt="instagram"
            />{" "}
          </a>
          <a
            className="row"
            rel="noreferrer"
            target="_blank"
            href="https://api.whatsapp.com/send/?phone=221773292123&text&app_absent=0"
          >
            {" "}
            <img
              src="https://img.icons8.com/ios-glyphs/24/000000/whatsapp.png"
              alt="whatsapp"
            />{" "}
          </a>
        </div>
      </div>
      <nav style={{ backgroundColor: "var(--primary-color)" }} className="container row">
        <Navbar />
      </nav>
    </header>
  );
}

export default Header;
