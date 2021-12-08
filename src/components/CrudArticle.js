import React, { useEffect, useState } from 'react'
import axios from "axios";
import notloading from "././../assets/models/notloading.webp";

function CrudArticle() {
    const [totalCtg, settotalCtg] = useState([])
    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('https://sugar-paper.com/categorie')
            .then(response => settotalCtg(response.data));

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get('https://sugar-paper.com/article');
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        setRefresh(false)
        fetchData();
    }, [refresh]);

    /* **************************************************************** */

    function ajouterArticle(e) {

        e.preventDefault();
        const name = document.querySelector('#article-name-add').value;
        const price = parseInt(document.querySelector('#article-price-add').value);
        const ctg = parseInt(document.querySelector('#article-category-add').value);
        const imageurl = document.querySelector('#article-img-add').value;
        const description = document.querySelector('#article-description-add').value;

        axios.post('https://sugar-paper.com/article', {
            nom_article: name,
            prix_article: price,
            url_img_article: imageurl,
            id_categorie: ctg,
            description: description
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

        setRefresh(true);
        document.getElementById("article-name-add").value = "";
        document.getElementById("article-price-add").value = "";
        document.getElementById("article-category-add").value = "";
        document.getElementById("article-img-add").value = "";
        document.getElementById("article-description-add").value = "";
    }

    /* **************************************************************** */

    function deleteCtg(e) {
        e.preventDefault();
        let article_id = document.getElementById("article-id-delete").value;
        axios.delete(`https://sugar-paper.com/article/${article_id}`);
        setRefresh(true);
        document.getElementById("article-id-delete").value = "";
    }

    /* **************************************************************** */
    function updateArticle(e) {

        e.preventDefault();
        const name = document.querySelector('#article-name-rename').value;
        const price = parseInt(document.querySelector('#article-price-rename').value);
        const ctg = parseInt(document.querySelector('#article-category-rename').value);
        const id = parseInt(document.querySelector('#article-id-rename').value);
        const imageurl = document.querySelector('#article-img-rename').value;
        const description = document.querySelector('#article-description-rename').value;

        const url = 'https://sugar-paper.com/article/' + id
        axios.put(url, {
            nom_article: name,
            prix_article: price,
            url_img_article: imageurl,
            id_categorie: ctg,
            description: description
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

        setRefresh(true);
        document.getElementById("article-name-rename").value = "";
        document.getElementById("article-price-rename").value = "";
        document.getElementById("article-category-rename").value = "";
        document.getElementById("article-img-rename").value = "";
        document.getElementById("article-description-rename").value = "";
        document.getElementById("article-id-rename").value = "";
    }

    return (
        <div className="container column">
            <header className="container row row-between title">
                <h3>Articles</h3>
                <img title="Rafraichir" style={{ backgroundColor: "var(--grey-color)", margin: "5px", padding: "5px", borderRadius: "100%", cursor: "pointer", border: "1px solid black" }} onClick={() => { setRefresh(true) }} src="https://img.icons8.com/dotty/20/000000/refresh.png" alt="refresh  btn" />
            </header>
            <div className="container column action" id="crud-article">

                <form id="rename-article" className="container row row-right">
                    <h4>Modifier un article</h4>
                    <div className="container row row-right">
                        <input id="article-id-rename" type="number" name="id" placeholder="id" required />
                        <input id="article-name-rename" type="text" name="libelle" placeholder="Nouveau nom" required />
                        <input id="article-price-rename" type="number" name="prix" placeholder="Prix" required />
                    </div>
                    <div className="container row row-right">
                        <textarea className="col-12 col-md-9 col-xxl-6" placeholder="Description" id="article-description-rename"></textarea>
                    </div>
                    <div className="container row row-right">
                        <label for="article-category-rename">Catégorie</label>
                        <select id="article-category-rename" required>
                            {
                                totalCtg.map((ctg) => (
                                    <option key={ctg.id} value={ctg.id}>{ctg.nom_categorie}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="container row row-right">

                        <label for="article-img-rename">URL Image</label>
                        <input className="col-12 col-md-10" id="article-img-rename" type="text" />
                    </div>

                    <div className="container row row-right">
                        <button className="action-btn action-btn-primary" onClick={(e) => { updateArticle(e) }}> Modifier</button>
                    </div>
                </form>

                <form id="delete-article" className="container row row-right">
                    <h4>Supprimer un article</h4>
                    <input id="article-id-delete" type="number" name="id" placeholder="id" required />
                    <button className="action-btn action-btn-danger" onClick={(e) => { deleteCtg(e) }}> Supprimer</button>
                </form>

                <form id="add-article" onSubmit={e => ajouterArticle(e)} className="container row row-right">
                    <h4>Ajouter un article</h4>

                    <div className="container row row-right">
                        <input id="article-name-add" type="text" name="libelle" placeholder="Nom" required />
                        <input id="article-price-add" type="number" name="prix" placeholder="Prix" required />
                    </div>
                    <div className="container row row-right">
                        <textarea className="col-12 col-md-9 col-xxl-6" placeholder="Description" id="article-description-add"></textarea>
                    </div>
                    <div className="container row row-right">
                        <label for="article-category-add">Catégorie</label>
                        <select id="article-category-add" required>
                            {
                                totalCtg.map((ctg) => (
                                    <option key={ctg.id} value={ctg.id}>{ctg.nom_categorie}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="container row row-right">
                        <label for="article-img-add">URL Image</label>
                        <input className="col-12 col-md-10" id="article-img-add" type="text" />
                    </div>
                    <div className="container row row-right">
                        <button className="action-btn action-btn-success" /* onClick={(e) => { ajouterArticle(e) }} */> Ajouter</button>
                    </div>
                </form>

            </div>

            <div className="column container admin-list">
                <header className="ligne container row row-left">
                    <div className="col-12 row">
                        Liste articles
                    </div>
                </header>
                <div style={{ fontSize: "0.85rem" }} className="container row-top row row-left">
                    {loading && <div>Loading...</div>}
                    {!loading && (
                        data.map((element) => (
                            <div key={element.id} style={{ padding: "5px" }} className="col-6 col-md-4 col-xl-3 column">
                                <div key={element.id} style={{ border: "1px solid black", textAlign: "left", marginBottom: "5px" }} className="card container column">
                                    <img className="container" src={element.url_img_article ? element.url_img_article : notloading} alt={element.nom_article} />
                                    <div style={{ padding: "5px", textAlign: "left", borderBottom: "1px solid rgba(0, 0, 0, 0.4)" }} className="container row row-left">
                                        ID Article : {element.id}
                                    </div>
                                    <div style={{ padding: "5px", textAlign: "left", borderBottom: "1px solid rgba(0, 0, 0, 0.4)" }} className="container row row-left">
                                        Nom : {element.nom_article}
                                    </div>
                                    <div style={{ textAlign: "left", borderBottom: "1px solid rgba(0, 0, 0, 0.4)" }} className="container row row-left">
                                        <div className="container row row-left" style={{ padding: "5px", textAlign: "left", borderBottom: "1px solid rgba(0, 0, 0, 0.4)" }}>
                                            ID Catégorie : {element.id_categorie}
                                        </div>
                                        {totalCtg.map((ctg) => (
                                            ctg.id === element.id_categorie ?
                                                <div key={ctg.id} style={{ padding: "5px" }} className="container row row-left">
                                                    Nom Catégorie : {ctg.nom_categorie}
                                                </div>
                                                : ""
                                        ))}
                                    </div>
                                    <div style={{ padding: "5px", textAlign: "left", borderBottom: "1px solid rgba(0, 0, 0, 0.4)" }} className="container row row-left">
                                        Prix: {element.prix_article} CFA
                                    </div>
                                    <div style={{ padding: "5px", textAlign: "left" }} className="container row row-left">
                                        Description: {element.description}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default CrudArticle
