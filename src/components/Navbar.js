import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { Link as Linkscroll } from "react-scroll";
import DynamicLinks from "./DynamicLinks";
import DynamicMobLinks from "./DynamicMobLinks";
import menu from "./../assets/icons/menu.png";
import exit from "./../assets/icons/exit.png";
import logo from "./../assets/logo.png";
function Navbar() {
  let ctgList = null;
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('https://sugar-paper.com/categorie');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  ctgList = data;

  const [menuMob, setmenuMob] = useState(false);
  const changeMenu = () => {
    setmenuMob(!menuMob);
  };
  useEffect(() => {
    let theRight = document.querySelector("#mob-navbar").style.right;
    if (theRight === "100%") {
      document.querySelector("#mob-navbar").style.right = "0%";
    } else document.querySelector("#mob-navbar").style.right = "100%";
  }, [menuMob]);

  return (
    <div>
      <div className="row" id="bg-button">
        <img onClick={changeMenu} width="35" src={menu} alt="menu" />
      </div>
      <ul className="container row" id="navbar">
        <li className="fr-li">
          <Link to="/"> ACCUEIL </Link>
        </li>
        <li className="fr-li">
          <Linkscroll to="services" smooth={true} duration={1000}>
            SERVICES
          </Linkscroll>
        </li>

        <li className="fr-li">
          PRODUITS
          <ul className="fr-dropdown row">
            {ctgList === null ? " " : <DynamicLinks list={ctgList} />}
          </ul>
        </li>
        <li className="fr-li">
          <Linkscroll to="propos" smooth={true} duration={1000}>
            A PROPOS
          </Linkscroll>
        </li>
        <li className="fr-li">
          <Linkscroll to="footer" smooth={true} duration={1000}>
            CONTACT
          </Linkscroll>
        </li>
      </ul>

      <ul onClick={changeMenu} className="container column" id="mob-navbar">
        <img width="35" id="mb-menu-logo" src={logo} alt="Sugar paper" />
        <img
          onClick={changeMenu}
          id="exit-btn"
          width="35"
          src={exit}
          alt="exit-btn"
        />

        <Link to="/home">
          <li className="fr-li"> ACCUEIL </li>
        </Link>
        <Linkscroll
          onClick={changeMenu}
          to="services"
          smooth={true}
          duration={1000}
        >
          <li className="fr-li"> SERVICES </li>
        </Linkscroll>


        {ctgList === null ? " " : <DynamicMobLinks list={ctgList} />}

        <Linkscroll
          onClick={changeMenu}
          to="propos"
          smooth={true}
          duration={1000}
        >
          <li className="fr-li"> A PROPOS </li>
        </Linkscroll>
        <Linkscroll
          onClick={changeMenu}
          to="footer"
          smooth={true}
          duration={1000}
        >
          <li className="fr-li"> CONTACT </li>
        </Linkscroll>
      </ul>
    </div>
  );
}

export default Navbar;
