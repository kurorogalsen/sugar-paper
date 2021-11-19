import React from "react";
import Navbar from "./Navbar";
import logo from "./../assets/logo.png";
import loupe from "./../assets/icons/loupe.png";
import cart from "./../assets/icons/cart.png";
import { Link } from "react-router-dom";
import "./../styles/header.css";

function Header() {
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
          <input type="search" placeholder="Rechercher un produit..." />
          <button type="submit">
            <img width="20" src={loupe} alt="loupe" />
          </button>
        </form>

        <div id="header-pan" className="row">
          <Link to="/panier">
            <img width="20" src={cart} alt="panier" />
          </Link>
          <div>0 XOF</div>
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
      <nav style={{backgroundColor:"var(--primary-color)"}} className="container row">
        <Navbar />
      </nav>
    </header>
  );
}

export default Header;
