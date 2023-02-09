import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import OrderAPI from "../services/OrderAPI";
import AdminContainer from "../components/Container/AdminContainer";
import Table from "../components/Table/Table";
import ModalAdmin from "../components/Modal/ModalAdmin";
import moment from 'moment';
import {toast} from "react-toastify";

function AdminOrdersPage(props) {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [tableData, setTableData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentOrderID, setCurrentOrderID] = useState(null);


    // Le code pour remplir le tableau de data

    const tableHeader = [
        {id: 1, name: '#'},
        {id: 2, name: 'Date de commande'},
        {id: 3, name: 'Client'},
        {id: 4, name: 'Montant Total'},
        {id: 5, name: 'Statut'},
        {id: 6, name: 'Action'},
    ];

    const getDataTable = () => {
        if (orders) {
            console.log(orders)
            return orders.map((order, index) => (
                    [
                        {value: index + 1},
                        {value: order.confirmedAt ?? "Panier non validé"},
                        {
                            value: (
                                <>
                                    <Link to="">{order.user.firstname + " " + order.user.lastname}</Link>
                                </>
                            )
                        },
                        {value: order.total},
                        {
                            value: (order.status === "payé" ? (
                                    <span className="badge text-bg-primary">Paiement confirmé</span>
                                ) : (
                                    <span className="badge text-bg-danger">Paiement en attente</span>
                                )
                            )
                        },
                        {
                            value: (
                                <>
                                    <button
                                        className="btn btn-sm btn-danger inline me-4 mb-2"
                                        onClick={() => handleDelete(order.id)}
                                    >
                                        Supprimer
                                    </button>

                                    <button className="btn btn-sm btn-warning me-4 mb-2"
                                            data-bs-toggle="modal" data-bs-target="#modalAdmin"
                                            onClick={() => {
                                                setShowModal(true)
                                                setCurrentOrderID(order.id)
                                            }}
                                    >
                                        Fiche commande
                                    </button>
                                </>
                            )
                        }
                    ]
                )
            );
        }
    }

    const getOrdersData = async () => {
        try {
            const data = await OrderAPI.getAllOrders();
            setOrders(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const getOrderData = async () => {
        try {
            const data = await OrderAPI.getOrder(currentOrderID);
            setOrder(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrdersData();
    }, []);

    useEffect(() => {
        console.log(orders)
        setTableData(getDataTable());
    }, [orders]);

    useEffect(() => {
        if (currentOrderID) {
            getOrderData();
        }
    }, [currentOrderID]);

    const handleDelete = async (id) => {
        const originalOrders = [...orders];
        setOrders(orders.filter(order => order.id !== id));
        try {
            const response = await OrderAPI.deleteOrder(id);

            if (response.status === 204) {
                toast.success("La commande a bien été supprimée");
            }
        } catch (error) {
            setOrders(originalOrders);
            console.log(error.response);
        }
    }

    const handleDeleteOrder = async (id) => {
        const originalOrders = [...orders];
        setOrders(orders.filter(order => order.id !== id));

        try {
            const response = await OrderAPI.deleteOrder(id);

            if (response.status === 204) {
                toast.success("La commande a bien été supprimée");
            }
        } catch (error) {
            console.log(error.response)
            setOrders(originalOrders);
        }
    }

    return (
        <AdminContainer title="Gestion des commandes">
            <Table
                tableHeader={tableHeader}
                tableData={tableData}
            />
            <ModalAdmin
                setShowModal={setShowModal}
            >
                <div className="card">
                    <div className="card-header">
                        <h6 className="card-title">Détails de la commande</h6>

                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-bs-dismiss="modal" aria-label="Close">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
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
                                            <b>Statut</b> <span className="float-right">{order.status === "payé" ? (
                                            <span className="badge text-bg-primary">Paiement confirmé</span>
                                        ) : (
                                            <span className="badge text-bg-danger">Paiement en attente</span>
                                        )}</span>
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
                                    <button className="btn btn-primary me-2"
                                            onClick={() => handleConfirmOrder(order.id)}>
                                        Confirmer le paiement
                                    </button>
                                    <button className="btn btn-danger ml-2" onClick={() => handleDeleteOrder(order.id)}>
                                        Supprimer la commande
                                    </button>
                                    <button className="btn btn-success">
                                        Valider l'envoie
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalAdmin>
        </AdminContainer>
    );
}


export default AdminOrdersPage;