import React, { useEffect, useState } from 'react'
import axios from "axios";

function CrudArticle() {
    const [totalCtg, settotalCtg] = useState([])
    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('https://mossanegroup.com/categorie')
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
                const { data: response } = await axios.get('https://mossanegroup.com/article', {
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



    function ajouterArticle(e) {

        e.preventDefault();
        const formData = new FormData();
        const imagefile = document.querySelector('#article-img-add').files[0];
        formData.append("data", imagefile);

        const name = document.querySelector('#article-name-add').value;
        const price = document.querySelector('#article-price-add').value;
        console.log("Name:" + name);
        console.log("Price:" + price);
        console.log(formData);
        /* const id_ctg = document.querySelector('#article-category-add'); */


        axios.post('https://mossanegroup.com/article', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Accept': '*/*',
            }
        }, {
            nom_article: name,
            prix_article: price,
            id_categorie: 9,
            img_article: formData,
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
        axios.delete(`https://mossanegroup.com/article/${article_id}`);
        setRefresh(true);
        document.getElementById("article-id-delete").value = "";
    }
    return (
        <div className="container column">
            <header className="container row row-between title">
                <h3>Articles</h3>
                <img title="Rafraichir" style={{ backgroundColor: "var(--grey-color)", margin: "5px", padding: "5px", borderRadius: "100%", cursor: "pointer", border: "1px solid black" }} onClick={() => { setRefresh(true) }} src="https://img.icons8.com/dotty/20/000000/refresh.png" alt="refresh  btn" />
            </header>
            <div className="container column action" id="crud-collection">

                <form id="rename-collection" className="container row row-right">
                    <h4>Modifier un article</h4>
                    <div className="container row row-right">
                        <input type="number" name="id" placeholder="id" required />
                        <input type="text" name="libelle" placeholder="Nouveau nom" required />
                        <input type="number" name="prix" placeholder="Prix" required />
                    </div>
                    <div className="container row row-right">
                        <label for="id_ctg_input">Catégorie</label>
                        <select >
                            <option id="id_ctg_input" name="id catégorie" value="autres" selected>Autres</option>
                        </select>
                        <label for="id_ctg_collection">Collection</label>
                        <select >
                            <option id="id_ctg_collection" name="id collection" value="autres" selected>Autres</option>
                        </select>
                    </div>
                    <div className="container row row-right">
                        <label for="avatar">Choisir une photo</label>
                        <input type="file"
                            id="avatar" name="avatar"
                            accept="image/png, image/jpeg, image/jpg, image/webp, image/heif, image/heic, image/PNG, image/JPEG, image/JPG, image/WEBP, image/HEIF, image/HEIC" />
                    </div>

                    <div className="container row row-right">
                        <button className="action-btn action-btn-primary"> Modifier</button>
                    </div>
                </form>

                <form id="delete-collection" className="container row row-right">
                    <h4>Supprimer un article</h4>
                    <input id="article-id-delete" type="number" name="id" placeholder="id" required />
                    <button className="action-btn action-btn-danger" onClick={(e) => {deleteCtg(e)}}> Supprimer</button>
                </form>

                <form id="add-collection" className="container row row-right">
                    <h4>Ajouter un article</h4>

                    <div className="container row row-right">
                        <input id="article-name-add" type="text" name="libelle" placeholder="Nom" required />
                        <input id="article-price-add" type="number" name="prix" placeholder="Prix" required />
                    </div>
                    <div className="container row row-right">
                        <label for="article-category-add">Catégorie</label>
                        <select id="article-category-add">
                            <option name="id catégorie" value="autres" selected>Autres</option>
                        </select>
                        <label for="article-collection-add">Collection</label>
                        <select id="article-collection-add">
                            <option name="id collection" value="autres" selected>Autres</option>
                        </select>
                    </div>
                    <div className="container row row-right">
                        <label for="article-img-add">Choisir une photo</label>
                        <input id="article-img-add" type="file"
                            name="avatar"
                            accept="image/png, image/jpeg, image/jpg, image/webp, image/heif, image/heic, image/PNG, image/JPEG, image/JPG, image/WEBP, image/HEIF, image/HEIC" />
                    </div>
                    <div className="container row row-right">
                        <button className="action-btn action-btn-success" onClick={(e) => { ajouterArticle(e) }}> Ajouter</button>
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
                            <div key={element.id} className="card col-6 col-md-4 col-xl-3 column">
                                <img className="container" src={element.url_img_article} alt={element.nom_article} />
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
