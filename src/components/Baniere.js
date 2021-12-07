import React from "react";
import "./../styles/news.css";
import { Link } from "react-scroll";

function News(props) {
  if (props.new.img != null) {
    return (
      <div className="container column news-img">
        <img
          className="container"
          src={props.new.img.baniere}
          alt={props.new.text}
        />
        <button className="fr-btn new-cta">
          <Link to="services" smooth={true} duration={1000}>
            {props.new.cta}
          </Link>
        </button>
      </div>
    );
  } else {
    return (
      <div className="container news-no-img">
      </div>
    );
  }
}

export default News;
