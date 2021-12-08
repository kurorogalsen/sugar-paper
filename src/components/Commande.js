import React, { useEffect, useState } from 'react'
import axios from "axios";

function Commande() {

    const [loading, setLoading] = useState(true);
    const [commande, setCommande] = useState([])
    const [client, setClient] = useState([])
    const [article, setArticle] = useState([])
    const [refresh, setRefresh] = useState(true);
    const [articlecommande, setArticlecommande] = useState([]);
    const [refreshArticlecommande, setRefreshArticlecommande] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get('https://sugar-paper.com/commande');
                setCommande(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        setRefresh(false)
        fetchData();
    }, [refresh]);

    useEffect(() => {
        for (let i = 0; i < commande.length; i++) {
            articlecommande[commande[i].id] = JSON.parse(commande[i].articles);
        }
        setRefreshArticlecommande(!refreshArticlecommande);
    }, [commande]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get('https://sugar-paper.com/client');
                setClient(response);

            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        setRefresh(false)
        fetchData();
    }, [refresh]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get('https://sugar-paper.com/article');
                setArticle(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        setRefresh(false)
        fetchData();
    }, [refresh]);


    function deleteCommande(e, id) {
        e.preventDefault();
        axios.delete(`https://sugar-paper.com/commande/${id}`);
        setRefresh(true);
    }
    return (
        <div className="container column">
            <header className="container row row-between title">
                <h3>Commandes</h3>
                <img title="Rafraichir" style={{ backgroundColor: "var(--grey-color)", margin: "5px", padding: "5px", borderRadius: "100%", cursor: "pointer", border: "1px solid black" }} onClick={() => { setRefresh(true) }} src="https://img.icons8.com/dotty/20/000000/refresh.png" alt="refresh  btn" />
            </header>
            {loading && <div>Loading...</div>}
            {!loading && (
                <div className="container row row-left row-top">
                    {
                        commande.map((commande) => (
                            <div key={commande.id} style={{ padding: "10px 4px" }} className="col-12 col-sm-6 col-lg-5 col-xxl-4 column">
                                <div className="command-card container column commande-card">
                                    <div style={{ borderBottom: "1px solid black", padding: "10px 0px" }} className="container row row-left">
                                        ID : {commande.id} <br />
                                        Mode de paiement : {commande.mode_paiement} <br />
                                        Statut : {commande.status} <br />
                                        Date: {commande.created_at}
                                    </div>
                                    <div style={{ borderBottom: "1px solid black", padding: "10px 0px" }} lassName="container row row-left">
                                        <h4 style={{ textDecoration: "underline" }}>Informations sur le client:</h4>
                                        {client.map((account) => (
                                            account.id === commande.id_client ?
                                                <div key={account.id} className="container row row-left">
                                                    <div className="container row row-left">
                                                        Nom complet : {account.prenom_nom_client}
                                                    </div>
                                                    <div className="container row row-left">
                                                        Adresse  : {account.adresse_client}
                                                    </div>
                                                    <div className="container row row-left">
                                                        Email : {account.email_client}
                                                    </div>
                                                    <div className="container row row-left">
                                                        Tel : {account.tel_client}
                                                    </div>
                                                </div>
                                                : ""
                                        ))}
                                    </div>
                                    <div style={{ borderBottom: "1px solid black", padding: "10px 0px" }} className="container row row-left">
                                        <h4 style={{ textDecoration: "underline" }}>Articles commandés:</h4>

                                        {
                                            refreshArticlecommande && articlecommande[commande.id] !== undefined &&
                                            articlecommande[commande.id].map((item) => (
                                                article.map((produit) => (
                                                    produit.id === item.id_article ?
                                                        <div key={produit.id} style={{ padding: "5px" }} className="container row row-left">
                                                            <img style={{ padding: "5px" }} width="30" src={produit.url_img_article} alt={produit.nom_article} />
                                                            {produit.nom_article} ( {item.quantite} ) = {item.quantite * produit.prix_article}
                                                        </div>
                                                        : ""
                                                ))
                                            ))
                                        }
                                    </div>
                                    <div style={{ borderBottom: "1px solid black", padding: "10px 0px" }} className="container row row-left">
                                        Total = {commande.total_commande} CFA
                                    </div>
                                    <div style={{ padding: "10px 0px" }} className="container row">
                                        <button onClick={(e) => { deleteCommande(e, commande.id) }} className="action-btn action-btn-danger"> Supprimer la commande </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
            }
        </div >
    )
}

export default Commande
