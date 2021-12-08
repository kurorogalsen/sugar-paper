import React from "react";
import { useState } from "react";
import "./../styles/testimonials.css";

function Testimonials() {
  let i = 0;
  const testimonials = [
    {
      id: 3,
      author: "Aziz",
      url_author: null,
      text: "Je suis satisfait du service.",
    },
    {
      id: 4,
      author: "Florent",
      url_author: null,
      text: "Je suis satisfait du service.",
    },
    {
      id: 5,
      author: "Bibo",
      url_author: null,
      text: "Je suis satisfait du service.",
    },
    {
      id: 6,
      author: "Farimata",
      url_author: null,
      text: "Je suis satisfait du service.",
    },
  ];

  const [slide, setSlide] = useState(2);
  function incrementer(e) {
    e.preventDefault();
    if (slide < testimonials.length - 1) {
      setSlide(slide + 3);
    }
  }
  function decrementer(e) {
    e.preventDefault();
    if (slide > 2) {
      setSlide(slide - 3);
    }
  }
  const maxSlide = parseInt(testimonials.length / 3);
  return (
    <section id="testimonials" className="container row">
      <div onClick={(e) => { decrementer(e) }} className="slide row">{"<"}</div>
      <div className="title container row">
        <h3>RETOURS CLIENT</h3>
      </div>
      {testimonials.map((comment) => (
        (i <= slide && i++ >= slide - 2) ?
          <div key={comment.id} className="col-3 column comment">
            {comment.url_author !== null && (
              <img className="col-10" src={comment.url_author} alt={comment.author} />
            )}
            <p className="col-12 col-md-10">{comment.text}</p>
            <h3 className="col-12 col-md-10">{comment.author}</h3>
          </div>
          : ""
      ))}
      <div onClick={(e) => { incrementer(e) }} className="slide row">{">"}</div>
    </section>
  );
}

export default Testimonials;