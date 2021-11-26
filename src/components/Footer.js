import React from "react";
import "./../styles/footer.css"
import { Link } from "react-router-dom";
import tel from "./../assets/icons/tel.png"
import whatsapp from "./../assets/icons/whatsapp.png"
import facebook from "./../assets/icons/facebook.png"
import insta from "./../assets/icons/insta.png"

function Footer() {
  return (
    <div id="footer" className="container column">
      <div className="container colmn" style={{ backgroundColor: "var(--black-color", color: "var(--white-color" }}>
        <div className="container row">
          <a target="_blank" href="tel:+221773292123"><img width="50" src={tel} alt="" /></a>
          <a target="_blank" href="https://www.instagram.com/sugarpaper1/"><img width="50" src={insta} alt="" /></a>
          <a target="_blank" href="https://facebook.com/"><img width="50" src={facebook} alt="" /></a>
          <a target="_blank" href="https://api.whatsapp.com/send/?phone=221773292123&text&app_absent=0"><img width="50" src={whatsapp} alt="" /></a>
        </div>
        <div>Sugar Paper © 2021</div>
      </div>
    </div>
  );
}

export default Footer;
