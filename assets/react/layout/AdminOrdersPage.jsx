import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import OrderAPI from "../services/OrderAPI";
import AdminContainer from "../components/Container/AdminContainer";
import Table from "../components/Table/Table";
import ModalAdmin from "../components/Modal/ModalAdmin";
import moment from 'moment';
import {toast, ToastContainer} from "react-toastify";
import Pagination from "../components/Pagination/Pagination";

function AdminOrdersPage(props) {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [pageList, setPageList] = useState([]);
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
            return orders.map((order) => (
                    [
                        {value: order.id},
                        {value: order.confirmed_at ? moment(order.confirmedAt).format('l') : "Panier non validé"},
                        {
                            value: (
                                <>
                                    <Link to="">{order.user.firstname + " " + order.user.lastname}</Link>
                                </>
                            )
                        },
                        {value: `${order.total} €`},
                        {
                            value: (order.statut === "en cours" ? (
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
                            ))
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
            setOrders(data['hydra:member']);
            setPageList(data['hydra:view'])
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

    const handlePageChange = async (page) => {
        try {
            const data = await OrderAPI.getOrderByPage(page);
            console.log(data)
            setOrders(data['hydra:member']);
            setPageList(data['hydra:view']);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        getOrdersData();
    }, []);

    useEffect(() => {
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

    const handleUpdateOrder = async (id, data) => {

        // get key and value of data
        const key = Object.keys(data)[0];
        const value = Object.values(data)[0];


        const newOrder = {
            [key]: value
        }

        try {
            const response = await OrderAPI.updateOrder(id, newOrder);
            if (response.status === 200) {
                toast.success("La commande a bien été modifiée");
                setOrders(orders.map(order => order.id === id ? response.data : order));
                setOrder(response.data);

            }
        } catch (error) {
            console.log(error.response);
        }
    }



    return (
        <AdminContainer title="Gestion des commandes">
            <Pagination
                pages={pageList}
                onPageChange={handlePageChange}
            />
            <Table
                tableHeader={tableHeader}
                tableData={tableData}
            />
            <Pagination
                pages={pageList}
                onPageChange={handlePageChange}
            />
            <ModalAdmin
                setShowModal={setShowModal}
            >
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Détails de la commande #{order.id}</h4>
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
                                        <li className="list-group-item">
                                            <b>Téléphone</b> <span className="float-right">{customer.phoneNumber}</span>
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
            </ModalAdmin>
            <ToastContainer/>
        </AdminContainer>
    )
        ;
}


export default AdminOrdersPage;