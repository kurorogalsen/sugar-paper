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

    const [image, setImage] = useState([]);

    const onSubmit = async e => {
        e.preventDefault();
        let data = new FormData();
        console.log(image + ' ' + 'this is image pathname');
        data.append('image', image);

        const name = document.querySelector('#article-name-add').value;
        const price = parseInt(document.querySelector('#article-price-add').value);
        const ctg = parseInt(document.querySelector('#article-category-add').value);

        axios.post('https://sugar-paper.com/article', {
            nom_article: name,
            prix_article: price,
            id_categorie: ctg,
            description: "description à compléter"
        })
            .then(res => {
                console.log(res.data + 'this is data after api call');
            })
            .catch(err => console.log(err));
    };

    /* **************************************************************** */

    function ajouterArticle(e) {

        e.preventDefault();
        const imageData = new FormData();
        const imagefile = document.querySelector('#article-img-add').files[0];
        imageData.append("data", imagefile);

        const name = document.querySelector('#article-name-add').value;
        const price = parseInt(document.querySelector('#article-price-add').value);
        const ctg = parseInt(document.querySelector('#article-category-add').value);

        console.log(imageData['data']);
        /* const id_ctg = document.querySelector('#article-category-add'); */


        axios.post('https://sugar-paper.com/article', {
            nom_article: name,
            prix_article: price,
            id_categorie: ctg,
            img_article: imageData,
            description: "description bidon"
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

        setRefresh(true);
        document.getElementById("article-name-add").value = "";
    }


    function deleteCtg(e) {
        e.preventDefault();
        let article_id = document.getElementById("article-id-delete").value;
        axios.delete(`https://sugar-paper.com/article/${article_id}`);
        setRefresh(true);
        document.getElementById("article-id-delete").value = "";
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
                        <input type="number" name="id" placeholder="id" required />
                        <input type="text" name="libelle" placeholder="Nouveau nom" required />
                        <input type="number" name="prix" placeholder="Prix" required />
                    </div>
                    <div className="container row row-right">
                        <label for="id_ctg_input">Catégorie</label>
                        <select id="article-category-rename" required>
                            {
                                totalCtg.map((ctg) => (
                                    <option value={ctg.id}>{ctg.nom_categorie}</option>
                                ))
                            }
                        </select>
                        {/*                         
                        <label for="id_ctg_collection">Collection</label>
                        <select >
                            <option id="id_ctg_collection" name="id collection" value="autres" selected>Autres</option>
                        </select> */}
                    </div>
                    <div className="container row row-right">

                        <label for="article-img-rename">URL Image</label>
                        <input id="article-img-rename" type="text" value="https://www" />
                    </div>

                    <div className="container row row-right">
                        <button className="action-btn action-btn-primary"> Modifier</button>
                    </div>
                </form>

                <form id="delete-article" className="container row row-right">
                    <h4>Supprimer un article</h4>
                    <input id="article-id-delete" type="number" name="id" placeholder="id" required />
                    <button className="action-btn action-btn-danger" onClick={(e) => { deleteCtg(e) }}> Supprimer</button>
                </form>

                <form id="add-article" onSubmit={e => onSubmit(e)} className="container row row-right">
                    <h4>Ajouter un article</h4>

                    <div className="container row row-right">
                        <input id="article-name-add" type="text" name="libelle" placeholder="Nom" required />
                        <input id="article-price-add" type="number" name="prix" placeholder="Prix" required />
                    </div>
                    <div className="container row row-right">
                        <label for="article-category-add">Catégorie</label>
                        <select id="article-category-add" required>
                            {
                                totalCtg.map((ctg) => (
                                    <option value={ctg.id}>{ctg.nom_categorie}</option>
                                ))
                            }
                        </select>
                        {/* <label for="article-collection-add">Collection</label>
                        <select id="article-collection-add">
                            <option name="id collection" value="autres" selected>Autres</option>
                        </select> */}
                    </div>
                    <div className="container row row-right">
                        <label for="article-img-add">URL Image</label>
                        <input id="article-img-add" type="text" value="https://www" />
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
                <div className="container row row-left">
                    {loading && <div>Loading...</div>}
                    {!loading && (
                        data.map((element) => (
                            <div key={element.id} style={{ border: "1px solid black" }} className="card col-6 col-md-4 col-xl-3 column">
                                <img className="container" src={element.url_img_article ? element.url_img_article : notloading} alt={element.nom_article} />
                                <div style={{ padding: "5px" }} className="container row">
                                    ID: {element.id}
                                </div>
                                <div style={{ padding: "5px" }} className="container row">
                                    Catégorie: {element.id_categorie}
                                    {totalCtg.map((ctg) => (
                                        <div key={ctg.id} className="container row">
                                            {ctg.id === element.id_categorie ? ctg.nom_categorie : ""}
                                        </div>
                                    ))}
                                </div>
                                <div style={{ padding: "5px" }} className="container row">
                                    Prix: {element.prix_article}
                                </div>
                                <div style={{ padding: "5px" }} className="container row">
                                    Description: {element.description}
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
