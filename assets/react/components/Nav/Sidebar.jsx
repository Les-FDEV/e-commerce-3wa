import React from 'react';
import {Link} from "react-router-dom";

function Sidebar(props) {
    return (
        <div className="offcanvas offcanvas-start w-25" tabIndex="-1" id="offcanvas" data-bs-keyboard="false"
             data-bs-backdrop="false">
            <div className="offcanvas-header">
                <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
            </div>
            <div className="offcanvas-body px-0">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                    <li className="nav-item">
                        <a href="#" className="nav-link text-truncate">
                            <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Accueil</span>
                        </a>
                    </li>
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link text-truncate">
                            <i className="fs-5 bi-speedometer2"></i><span
                            className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                    </li>

                    <li className="dropdown">
                        <a href="#" className="nav-link dropdown-toggle  text-truncate" id="dropdown"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fs-5 bi-bootstrap"></i><span
                            className="ms-1 d-none d-sm-inline">Produits</span>
                        </a>
                        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdown">
                            <li>
                                <Link className="dropdown-item" to="/produits/consulter" >Consulter</Link>
                            </li>
                            <li><Link className="dropdown-item" to="/produits/ajouter">Ajouter</Link></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="nav-link dropdown-toggle  text-truncate" id="dropdown"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fs-5 bi-bootstrap"></i><span
                            className="ms-1 d-none d-sm-inline">Catégories</span>
                        </a>
                        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdown">
                            <li><a className="dropdown-item" href="#">Consulter</a></li>
                            <li><a className="dropdown-item" href="#">Ajouter</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="nav-link dropdown-toggle  text-truncate" id="dropdown"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fs-5 bi-bootstrap"></i><span
                            className="ms-1 d-none d-sm-inline">Caractéristiques</span>
                        </a>
                        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdown">
                            <li><a className="dropdown-item" href="#">Consulter</a></li>
                            <li><a className="dropdown-item" href="#">Ajouter</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-truncate">
                            <i className="fs-5 bi-people"></i><span className="ms-1 d-none d-sm-inline">Commandes</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-truncate">
                            <i className="fs-5 bi-table"></i><span
                            className="ms-1 d-none d-sm-inline">Clients</span></a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;