import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./../styles/lastmodels.css";

function Lastmodels() {

  /* GET CATEGORIES TO FILTER */

  const [dataCtg, setDataCtg] = useState([])
  useEffect(() => {
    setRefresh(false);
    // GET request using axios inside useEffect React hook
    axios.get('https://sugar-paper.com/categorie')
      .then(response => setDataCtg(response.data));
    setRefresh(true);
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);


  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [articlesCtg, setArticlesCtg] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('https://sugar-paper.com/article');
        setData(response);
        for (let i = 0; i < dataCtg.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (data[j].id_categorie === dataCtg[i].id) {
              articlesCtg[i] = data[j];
            }
          }
        }
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, [refresh, dataCtg]);


  /* Calcul TOTAL */
  function calculTotal() {
    let total = 0;
    data.map((article) => (
      localStorage[article.id] ? total += localStorage[article.id] * article.prix_article : ""
    ))
    return (total + " CFA");
  }

  /* LocalStorage gestion */
  const addCart = (id) => {
    if (!localStorage[id]) {
      localStorage.setItem(id, 1);
      document.getElementById("total-panier").innerHTML = calculTotal();
    }
  }

  return (
    <div className="container row">
      {loading && <div>Loading...</div>}
      {!loading &&
        articlesCtg.map((model) => (
          <div key={model.id} style={{ backgroundColor: "var(--grey-color)", padding: "10px" }} className="fr-model col-6 col-md-3 col-xl-2 row">
            <div className="container column">
              <img className="container" src={model.url_img_article} alt={model.title} />
              <p className="container row"> {model.nom_article} </p>
              <p className="container row"> {model.prix_article} CFA </p>
              <button onClick={() => { addCart(model.id) }} className="fr-btn"> AJOUTER AU PANIER </button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Lastmodels;
