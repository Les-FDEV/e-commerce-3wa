import React from 'react';
import moment from "moment/moment";

function AdminCard({title}) {

    const getListGroup = (data) => {
        data.map((item, index) => {
            return (
                <li className="list-group-item">
                    <b>{item.label}</b> <span className="float-right">{item.value}</span>
                </li>
            )
        })
    }

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">title</h4>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <h5>Client</h5>
                        <div className="col-12">
                            <ul className="list-group list-group-unbordered mb-3">
                                <li className="list-group-item">
                                    <b>Email</b> <span className="float-right">{order.user?.email}</span>
                                </li>
                                <li className="list-group-item">
                                    <b>Nom</b> <span className="float-right">{order.user?.lastname}</span>
                                </li>
                                <li className="list-group-item">
                                    <b>Prénom</b> <span className="float-right">{order.user?.firstname}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h5>Adresse(s)</h5>
                            <ul className="list-group list-group-unbordered mb-3">
                                <li className="list-group-item">
                                    {order.user?.addresses &&
                                        order.user.addresses.map(
                                            (address, index) => (
                                                <span key={index}>
                                                            <h6>
                                                                <b>Adresse {index + 1}
                                                                </b>
                                                            </h6>
                                                            <ul>
                                                                <li className="list-group-item">
                                                                    <b>Rue</b> <span
                                                                    className="float-right"> : {address.street}</span>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <b>Numéro de rue</b> <span
                                                                    className="float-right"> : {address.number}</span>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <b>Code postal</b> <span
                                                                    className="float-right"> : {address.zipCode}</span>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <b>Ville</b> <span
                                                                    className="float-right"> : {address.city}</span>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <b>Pays</b> <span
                                                                    className="float-right"> : {address.country}</span>
                                                                </li>
                                                            </ul>
                                                        </span>
                                            )
                                        )
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h5>Informations de la commande</h5>
                        <div className="col-12">
                            <ul className="list-group list-group-unbordered mb-3">
                                <li className="list-group-item">
                                    <b>Numéro de commande</b> <span className="float-right">{order.id}</span>
                                </li>
                                <li className="list-group-item">
                                    <b>Date de la commande</b> <span
                                    className="float-right">{moment(order.confirmedAt).format('l')}</span>
                                </li>
                                <li className="list-group-item">
                                    <b>Statut</b> <span
                                    className="float-right">{(order.statut === "en cours" ? (
                                    <span className="badge text-bg-primary">En cours</span>
                                ) : (order.statut === "payé" ? (
                                        <span className="badge text-bg-success">Payé</span>
                                    ) : (order.statut === "envoyé" ? (
                                            <span className="badge text-bg-info">Envoyé</span>
                                        ) : (order.statut === "livré" ? (
                                                <span className="badge text-bg-success">Livré</span>

                                            ) : null
                                        )
                                    )
                                ))}</span>
                                </li>
                                <li className="list-group-item">
                                    <b>Montant total</b> <span className="float-right">{order.total} €</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h5>Produits de la commande</h5>
                        <div className="col-12">
                            <ul className="list-group list-group-unbordered mb-3">
                                {order.orderProducts &&
                                    order.orderProducts.map(
                                        (orderProduct, index) => (
                                            <li key={index}
                                                className="list-group-item">
                                                <p
                                                >Produit : {orderProduct.product}</p>
                                                <p
                                                >Quantité(s) : {orderProduct.quantity}</p>
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h5>Actions</h5>
                        <div className="col-12 d-flex flex-row ">
                            {order.statut === "en cours" && (
                                <button
                                    className="btn btn-primary me-2"
                                    data-bs-dismiss="modal"
                                    onClick={() => handleUpdateOrder(order.id, {statut: "payé"})}
                                >
                                    Confirmer le paiement
                                </button>
                            )}
                            <button
                                className="btn btn-danger ml-2"
                                data-bs-dismiss="modal"
                                onClick={() => handleDelete(order.id)}
                            >
                                Supprimer la commande
                            </button>
                            {order.statut === "payé" && order.statut !== "envoyé" && (
                                <button
                                    className="btn btn-success"
                                    data-bs-dismiss="modal"
                                    onClick={() => handleUpdateOrder(order.id, {statut: "envoyé"})}
                                >
                                    Valider l'envoie
                                </button>
                            )
                            }
                            {order.statut === "envoyé" && (
                                <button
                                    className="btn btn-success"
                                    data-bs-dismiss="modal"
                                    onClick={() => handleUpdateOrder(order.id, {statut: "livré"})}
                                >
                                    Valider la réception
                                </button>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AdminCard;