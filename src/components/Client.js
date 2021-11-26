import React from 'react';
import "./../styles/client.css";
function Client() {
    const clients = [
        {
            id: 0,
            nom: "Patrick",
            mail: "patrick@gmail.com",
            tel: "778596330",
            adresse: "74 rue Fleurus Dakar",
        },
        {
            id: 1,
            nom: "Marietou",
            mail: "patrick@gmail.com",
            tel: "778596330",
            adresse: "74 rue Fleurus Dakar",
        },
        {
            id: 2,
            nom: "Fatou",
            mail: "fatoumatasylla123@gmail.com",
            tel: "778596330",
            adresse: "74 rue Fleurus Dakar",
        }
    ]
    return (
        <div className="container row row-top" id="clients">
            <header className="container row title">
                <h3>LISTE CLIENTS</h3>
            </header>
            {
                clients.map((client) => (
                    <div key={client.id} className="col-12 col-sm-6 col-md-4 col-xl-3 column client-card">
                        <div className="container row row-left">
                            {client.nom}
                        </div>
                        <div className="container row row-left">
                            {client.tel}
                        </div>
                        <div className="container row row-left">
                            {client.adresse}
                        </div>
                        <div className="container row row-left">
                            {client.mail}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Client
