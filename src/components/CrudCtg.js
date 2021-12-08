import React, { useEffect, useState } from 'react'
import axios from "axios";

function CrudCtg() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get('https://sugar-paper.com/categorie');
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        setRefresh(false)
        fetchData();
    }, [refresh]);

    function ajouterCtg(e) {
        e.preventDefault();
        let ctg_name = document.getElementById("ctg-name").value;
        axios.post('https://sugar-paper.com/categorie', {
            nom_categorie: ctg_name,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        setRefresh(true);
        document.getElementById("ctg-name").value = "";
    }

    function deleteCtg(e) {
        e.preventDefault();
        let ctg_id = document.getElementById("ctg-id-delete").value;
        axios.delete(`https://sugar-paper.com/categorie/${ctg_id}`);
        setRefresh(true);
        document.getElementById("ctg-id-delete").value = "";
    }

    function renameCtg(e) {
        e.preventDefault();
        let ctg_id = document.getElementById("ctg-id-rename").value;
        let ctg_name = document.getElementById("ctg-name-rename").value;
        axios.put(`https://sugar-paper.com/categorie/${ctg_id}`, {
            nom_categorie: ctg_name,
        });
        setRefresh(true);
        document.getElementById("ctg-id-rename").value = "";
        document.getElementById("ctg-name-rename").value = "";
    }
    return (

        <div className="container column" id="ctg-action">
            <header className="container row row-between title">
                <h3>Catégories</h3>
                <img title="Rafraichir" style={{ backgroundColor: "var(--grey-color)", margin: "5px", padding: "5px", borderRadius: "100%", cursor: "pointer", border: "1px solid black" }} onClick={() => { setRefresh(true) }} src="https://img.icons8.com/dotty/20/000000/refresh.png" alt="refresh  btn" />
            </header>
            <div className="container column action" id="crud-ctg">
                <form id="rename-ctg" className="container row row-right">
                    <h4>Renommer une catégorie</h4>
                    <input id="ctg-id-rename" min="1" type="number" name="id" placeholder="id" />
                    <input id="ctg-name-rename" type="text" name="libelle" placeholder="Nouveau nom" />
                    <button className="action-btn action-btn-primary" onClick={(e) => { renameCtg(e) }}> Renommer</button>
                </form>

                <form id="delete-ctg" className="container row row-right">
                    <h4>Supprimer une catégorie</h4>
                    <input id="ctg-id-delete" min="1" type="number" name="id" placeholder="id" />
                    <button className="action-btn action-btn-danger" onClick={(e) => { deleteCtg(e) }}> Supprimer</button>
                </form>

                <form id="add-ctg" className="container row row-right">
                    <h4>Ajouter une catégorie</h4>
                    <input id="ctg-name" type="text" name="libelle" placeholder="Nom" />
                    <button className="action-btn action-btn-success" onClick={(e) => { ajouterCtg(e) }}> Ajouter</button>
                </form>

            </div>
            <div className="column container admin-list">
                <header className="ligne container row row-left">
                    <div className="col-3 row row-left">
                        id
                    </div>
                    <div className="col-9 row row-left">
                        libelle
                    </div>
                </header>
                {loading && <div>Loading...</div>}
                {!loading && (
                    data.map((element) => (
                        <div key={element.id} className="ligne container row row-left">
                            <div className="col-3 row row-left">
                                {element.id}

                            </div>
                            <div className="col-9 row row-left">
                                {element.nom_categorie}
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}

export default CrudCtg
