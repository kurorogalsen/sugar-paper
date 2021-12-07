import React, { useEffect, useState } from 'react'
import axios from "axios";
import notloading from "./../assets/models/notloading.webp";
import "./../styles/panier.css";
import bcrypt from 'bcryptjs'

function Panier() {
    function encryptermdp(mdp) {
        const hashedPassword = bcrypt.hashSync(mdp, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up
        return hashedPassword;
    }
    /* GET ARTICLES */
    const [dataArticle, setdataArticle] = useState([])
    const [load, setLoad] = useState()
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoad(true);
            try {
                const { data: response } = await axios.get('https://sugar-paper.com/article');
                setdataArticle(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoad(false);
        }
        fetchData();
    }, [refresh]);


    /* **************************** */

    /* Calcul TOTAL */
    let total = 0;
    dataArticle.map((article) => (
        localStorage[article.id] ? total += localStorage[article.id] * article.prix_article : ""
    ))

    /* Calcul TOTAL FUNCTION */
    function calculTotal() {
        let total = 0;
        dataArticle.map((article) => (
            localStorage[article.id] ? total += localStorage[article.id] * article.prix_article : ""
        ))
        document.getElementById("total-panier").innerHTML = total + " CFA";
    }

    /* Increment */
    const increment = (id, qt) => {
        localStorage.setItem(id, qt + 1);
        setRefresh(!refresh);
        calculTotal();
    }

    /* Decrement */
    const decrement = (id, qt) => {
        if (qt >= 1) {
            localStorage.setItem(id, qt - 1);
        }
        setRefresh(!refresh);
        calculTotal();
    }

    /* Remove */
    const remove = (id) => {
        localStorage.removeItem(id)
        setRefresh(!refresh);
        calculTotal();
    }

    /* Infos validation */
    const [valid, setvalid] = useState(false)
    const [account, setAccount] = useState(true);
    const [accountlist, setAccountlist] = useState([])
    // VALIDATION DES CHAMPS
    function validation(e) {
        e.preventDefault();
        let name = document.getElementById("nom").value;
        let tel = document.getElementById("tel").value;
        let mail = document.getElementById("mail").value;
        let adresse = document.getElementById("adresse").value;
        let password = document.getElementById("password").value;
        if (name !== "" && tel !== "" && mail !== "" && adresse !== "" && password !== "") {
            if (name !== "")
                document.getElementById("nom").style.border = "1px solid rgba(0, 0, 0, 0.144)";
            if (tel !== "")
                document.getElementById("tel").style.border = "1px solid rgba(0, 0, 0, 0.144)";
            if (mail !== "")
                document.getElementById("mail").style.border = "1px solid rgba(0, 0, 0, 0.144)"
            if (adresse !== "")
                document.getElementById("adresse").style.border = "1px solid rgba(0, 0, 0, 0.144)"
            if (password !== "")
                document.getElementById("password").style.border = "1px solid rgba(0, 0, 0, 0.144)"

            return true;

        }
        else {
            if (name === "")
                document.getElementById("nom").style.border = "1px solid var(--danger-color)";
            else
                document.getElementById("nom").style.border = "1px solid rgba(0, 0, 0, 0.144)";
            if (tel === "")
                document.getElementById("tel").style.border = "1px solid var(--danger-color)";
            else
                document.getElementById("tel").style.border = "1px solid rgba(0, 0, 0, 0.144)";
            if (mail === "")
                document.getElementById("mail").style.border = "1px solid var(--danger-color)"
            else
                document.getElementById("mail").style.border = "1px solid rgba(0, 0, 0, 0.144)";
            if (adresse === "")
                document.getElementById("adresse").style.border = "1px solid var(--danger-color)"
            else
                document.getElementById("adresse").style.border = "1px solid rgba(0, 0, 0, 0.144)";
            if (password === "")
                document.getElementById("password").style.border = "1px solid var(--danger-color)"
            else
                document.getElementById("password").style.border = "1px solid rgba(0, 0, 0, 0.144)";
            return false;
        }
    }
    function inscription(e) {
        setAccount(false);
        if (validation(e)) {
            const name = document.querySelector('#nom').value;
            const mail = document.querySelector('#mail').value;
            const tel = document.querySelector('#tel').value;
            const adresse = document.querySelector('#adresse').value;
            const passwd = document.querySelector('#password').value;

            axios.post('https://sugar-paper.com/client', {
                prenom_nom_client: name,
                email_client: mail,
                tel_client: tel,
                adresse_client: adresse,
                passwd: encryptermdp(passwd)
            }).then(function (response) {
                console.log(response);
                if (response.status === 201) {
                    setAccount(true);
                }
                else {
                    alert("Il existe déjà un compte avec ces identifiants. Identifiants oubliés? Veuillez contacter votre service client.");
                }
            }).catch(function (error) {
                console.log(error);
                alert("Il s'est passé quelque chose d'anormal !");
            });
        }
    }

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('https://sugar-paper.com/client')
            .then(response => setAccountlist(response.data));
        console.log(accountlist);
    }, [account]);

    const [articlepanier, setArticlepanier] = useState([])

    function articlesPanier() {
        let listID = [];
        let quantite = [];
        dataArticle.map((article) => (
            localStorage[article.id] ? listID[listID.length] = article.id : ""
        ))
        dataArticle.map((article) => (
            localStorage[article.id] ? quantite[quantite.length] = localStorage[article.id] : ""
        ))
        for (let i = 0; i < listID.length; i++) {
            articlepanier[i] = {
                "id": parseInt(listID[i]),
                "quantite": parseInt(quantite[i])
            }
        }
    }

    function validerCommande(id, e) {
        e.preventDefault();
        setvalid(true);
        articlesPanier();
        axios.post('https://sugar-paper.com/commande', {
            articles: articlepanier,
            total_commande: parseInt(total),
            mode_paiement: "À la livraison",
            id_client: parseInt(id),
            status: "Reçu"
        })
            .then(res => {
                console.log(res.data + 'this is data after api call');
            })
            .catch(err => console.log(err));
        localStorage.clear();
        calculTotal();
        setRefresh(!refresh);
        setvalid(false);
    }

    /* const [connecte, setConnecte] = useState(false); */

    function LookingAccount(e) {
        e.preventDefault();
        let tel_connexion = document.getElementById("tel_connexion").value;
        let password_connexion = document.getElementById("password_connexion").value;

        axios.get('https://sugar-paper.com/client')
            .then(response => setAccountlist(response.data));

        accountlist.map((compte) => (
            (compte.tel_client === tel_connexion && compte.passwd === encryptermdp(password_connexion)) ? setvalid(true) : ""
        ))
        console.log(valid);
        if (valid === false) {
            document.getElementById("tel_connexion").style.border = "red 1px solid";
            document.getElementById("password_connexion").style.border = "red 1px solid";
        }
    }
    function envoiCommande(e) {
        e.preventDefault();
        let tel_connexion = document.getElementById("tel_connexion").value;
        let password_connexion = document.getElementById("password_connexion").value;
        accountlist.map((compte) => (
            (compte.tel_client === tel_connexion && compte.passwd === encryptermdp(password_connexion)) ? validerCommande(compte.id, e) : ""
        ))

    }
    return (
        <div className="container row row-top">
            <div className="title container row">
                <h3>Panier</h3>
            </div>

            {load ?
                <div className="container row">
                    Loading...
                </div>
                :
                <div className="container row row-top">
                    {
                        dataArticle.map((article) => (
                            localStorage[article.id] ?
                                <div key={article.id} className="panier-article column column-top">
                                    <div>
                                        <img src={article.url_img_article ? article.url_img_article : notloading} alt={article.nom_article} />
                                    </div>
                                    <div className="container column column-top">
                                        <div className="container row row-left">
                                            Nom article: {article.nom_article}
                                        </div>
                                        <div className="container row row-left">
                                            Prix = {article.prix_article}
                                        </div>
                                        <div className="container row row-left">
                                            Quantite = {localStorage[article.id]}
                                        </div>
                                        <div className="container column column-left">
                                            <div>
                                                Total = {localStorage[article.id] * article.prix_article}
                                            </div>
                                            <div style={{ padding: "10px 0px" }} className="action-container container row row-between">
                                                <div>
                                                    <button onClick={() => remove(parseInt(article.id))} className="action-btn action-btn-danger">Retirer</button>
                                                </div>
                                                <div>
                                                    <button onClick={() => decrement(parseInt(article.id), parseInt(localStorage[article.id]))} className="action-btn action-btn-primary">-</button><button onClick={() => increment(parseInt(article.id), parseInt(localStorage[article.id]))} className="action-btn action-btn-success">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                ""
                        ))}
                </div>
            }
            <div id="customer_info" className="container row">

                <div className="title container row">
                    <h3>Informations De Livraison</h3>
                </div>
                {valid ? <div style={{ padding: "15px" }} className="container">
                    {console.log(valid)}
                    <div className="container">
                        Vos informations ont été enregistrées avec succès 🎉
                    </div>
                    <div className="container">
                        Veuillez choisir votre mode de paiement et valider la commande ✅
                    </div>
                    <div style={{ padding: "10px" }} className="container">
                        <button onClick={() => { setvalid(false) }} className="fr-btn"> {' < '} Précedent</button>
                    </div>

                </div>
                    : ""
                }
                {account ?
                    <div style={{ display: `${valid ? "none" : "flex"}` }} id="connexion" className="container column">
                        <h3>CONNEXION</h3>
                        <form className="col-12 col-md-9 col-lg-8 col-xl-7 col-xxl-6 row">
                            <div className="container row row-left">
                                <label className="label container row row-left" for="tel_connexion">Téléphone</label>
                                <input required className="container row row-left" id="tel_connexion" pattern="[0-9]{12}" type="tel" placeholder="Format: 773292123" />
                            </div>
                            <div className="container row row-left">
                                <label className="label container row row-left" for="password_connexion">Mot De Passe</label>
                                <input required className="container row row-left" id="password_connexion" type="password" placeholder="Mot de passe" />
                            </div>
                            <button type="submit" onClick={(e) => { LookingAccount(e) }} style={{ marginTop: "25px" }} className="fr-btn">Suivant {' >'}</button>
                            <div className="container row">
                                <div style={{ color: "rgba(0, 0, 0, 0.544)", padding: "10px", fontSize: "0.8rem", cursor: "pointer", textDecoration: "underline" }} className="row" onClick={() => { setAccount(false) }}>Vous n'avez pas de compte ?</div>
                                <a href="https://api.whatsapp.com/send/?phone=221773292123&text&app_absent=0" style={{ color: "rgba(0, 0, 0, 0.544)", padding: "10px", fontSize: "0.8rem", cursor: "pointer", textDecoration: "underline" }} className="row" target="_blank" rel="noreferrer">Vous avez oublié votre mot de passe ?</a>
                            </div>
                        </form>
                    </div>
                    :
                    <div id="inscription" className="container column">
                        <form style={{ display: `${valid ? "none" : "flex"}` }} className="col-12 col-md-9 col-lg-8 col-xl-7 col-xxl-6 row row-top">
                            <div className="column column-top col-12 col-md-6">
                                <div className="container row row-left">
                                    <label className="label container row row-left" for="nom">Nom Complet</label>
                                    <input required className="container row row-left" id="nom" type="text" placeholder="Nom complet..." />
                                </div>
                                <div className="container row row-left">
                                    <label className="label container row row-left" for="mail">Mail</label>
                                    <input required className="container row row-left" id="mail" type="email" placeholder="Email..." />
                                </div>
                                <div className="container row row-left">
                                    <label className="label container row row-left" for="password">Mot De Passe</label>
                                    <input required className="container row row-left" id="password" type="password" placeholder="Mot de passe..." />
                                    <div style={{ color: "rgba(0, 0, 0, 0.544)", fontSize: "0.7rem", textAlign: "left", padding: "10px" }} className="container row row-left">
                                        ⚠️ : Vous êtes en train de créer un mot de passe, assurez vous de vous en rappeler
                                    </div>
                                </div>
                            </div>
                            <div className="column column-top col-12 col-md-6">
                                <div className="container row row-left">
                                    <label className="label container row row-left" for="adresse">Adresse Physique</label>
                                    <input required className="container row row-left" id="adresse" type="text" placeholder="Adresse physique..." />
                                </div>
                                <div className="container row row-left">
                                    <label className="label container row row-left" for="tel">Téléphone</label>
                                    <input required className="container row row-left" id="tel" pattern="[0-9]{12}" type="tel" placeholder="Format: 773292123" />
                                </div>
                            </div>
                            <button type="submit" onClick={(e) => { inscription(e) }} style={{ marginTop: "25px" }} className="fr-btn">Suivant {' >'}</button>
                            <div style={{ color: "rgba(0, 0, 0, 0.544)", padding: "10px", fontSize: "0.8rem", cursor: "pointer", textDecoration: "underline" }} className="container row" onClick={() => { setAccount(true) }}>Vous avez déjà un compte ?</div>
                        </form>
                    </div>
                }

            </div>
            <div id="payment" className="container row">

                <div className="title container row">
                    <h3>Paiement {'&'} Livraison</h3>
                </div>

                {!valid ? <div>
                    Veuillez remplir tous les champs correctement avant de passer à l'étape suivante !
                </div>
                    :
                    <div className="container column">
                        <div>
                            Total à payer: {total} CFA
                        </div>
                        <form className="column">
                            <select style={{ border: "1px solid rgba(0, 0, 0, 0.144)", outline: "none", padding: "5px 7px", backgroundColor: "var(--white-color)", fontSize: "1rem" }}>
                                <option value="À la livraison" selected>À la livraison</option>
                                <option value="À la livraison" disabled>Mobile Money (à venir)</option>
                            </select>
                            <button onClick={(e) => { envoiCommande(e) }} className="fr-btn"> Valider la commande </button>
                        </form>
                    </div>
                }
            </div>

        </div>
    )
}

export default Panier
