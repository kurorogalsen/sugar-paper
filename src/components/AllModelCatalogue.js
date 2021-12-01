import React, { useEffect, useState } from 'react'
import axios from "axios";
import notloading from "./../assets/models/notloading.webp";
function AllModelCatalogue({ ctg }) {

  /* GET ARTICLES */
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('https://sugar-paper.com/article', {
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        });
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    setRefresh(false)
    fetchData();
  }, [refresh]);

  /* Calcul TOTAL */
  function calculTotal() {
    let total = 0;
    data.map((article) => (
      localStorage[article.id] ? total += localStorage[article.id] * article.prix_article : ""
    ))
    return (total + " CFA");
  }

  /* GET CATEGORIES TO FILTER */
  const [dataCtg, setDataCtg] = useState([])

  const allCtgF = () => {
    axios.get('http://sugar-paper.com/categorie').then((response) => {
      setDataCtg(response.data);
      console.log(response.data);
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    allCtgF();
  }, [])

  let id_ctg;
  dataCtg.map((category) => (
    category.nom_categorie === ctg ? id_ctg = category.id : ""
  ));

  /* LocalStorage gestion */
  const addCart = (id) => {
    if (!localStorage[id]) {
      localStorage.setItem(id, 1);
      document.getElementById("total-panier").innerHTML = calculTotal();
    }
  }
  return data.map(
    (model) =>
      model.id_categorie === id_ctg && (
        <div key={model.id} className="fr-card column column-top">
          {loading && <div>Loading...</div>}
          {!loading && (
            <div className="container column column-top">
              <div>
                <img style={{border: "1px solid rgba(0, 0, 0, 0.678)", borderRadius: "2px"}} src={model.url_img_article ? model.url_img_article : notloading} alt={model.nom_article} />
              </div>
              <h3>{model.nom_article}</h3>
              <p>{model.description}</p>
              <p>{model.prix_article} CFA</p>
              <button onClick={() => { addCart(model.id) }} className="fr-btn">Ajouter</button>
            </div>
          )}
        </div>
      )
  );
}

export default AllModelCatalogue;
