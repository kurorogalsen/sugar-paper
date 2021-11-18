import React from "react";
import AdminHome from "../components/AdminHome";

import { useState } from "react";
import "./../styles/admin.css";

function Admin() {
  const password = "passer";
  const [auth, setAuth] = useState(false);
  const passwordSubmit = (e) => {
    e.preventDefault();
    if (document.getElementById("passwordInput")) {
      let passInput = document.getElementById("passwordInput").value;
      console.log(passInput);
      if (passInput === password) {
        return setAuth(!auth);
      }
    }
  };

  return (
    <main id="admin">
      {auth ? (
        <AdminHome />
      ) : (
        <form>
          <input id="passwordInput" type="password" placeholder="password" />
          <br />
          <button type="submit" onClick={passwordSubmit}>
            Valider
          </button>
        </form>
      )}
    </main>
  );
}
export default Admin;
