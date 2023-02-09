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
                    <li>
                        <Link className="nav-link text-truncate" to="/produits">
                            <i className="fs-5 bi-speedometer2"></i>
                            <span className="ms-1 d-none d-sm-inline">Produits</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link text-truncate" to="/categories">
                            <i className="fs-5 bi-speedometer2"></i>
                            <span className="ms-1 d-none d-sm-inline">Categories de produit</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link text-truncate" to="/commandes">
                            <i className="fs-5 bi-table"></i>
                            <span className="ms-1 d-none d-sm-inline">Commandes</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link text-truncate" to="/clients">
                            <i className="fs-5 bi-person"></i>
                            <span className="ms-1 d-none d-sm-inline">Clients</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;