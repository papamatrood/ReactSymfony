import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthenticatorServices from "../services/authenticatorServices";


const Navbar = () => {

    function handleClick(event) {
        AuthenticatorServices.logout().then(isAuthenticated => {
            if (!isAuthenticated) {
                navigate('/login');
            }
            return
        });
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-info text-white mb-5">
            <div className="container-fluid">
                <Link className="navbar-brand mt-2 mt-lg-0 text-white" to="/">
                    Afribone
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Rapport d'activité</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Utilisateur
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/users">Utilisateurs</Link></li>
                                {/* <li><Link className="dropdown-item" to="">Profile</Link></li> */}

                            </ul>
                        </li>
                    </ul>
                    {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Se Connecter</Link>
                        </li>
                    </ul> */}
                </div>
                {/* <div className="d-flex align-items-center">
                        <span className="font-weight-bold me-5"></span>
                        <a href="" className="btn btn-sm btn-outline-primary" onClick={handleClick}>Se déconnecter</a>
                    </div> */}
            </div>
        </nav>
    )
};

export default Navbar;