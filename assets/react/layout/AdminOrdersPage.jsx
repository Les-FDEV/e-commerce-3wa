import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import OrderAPI from "../services/OrderAPI";
import AdminContainer from "../components/Container/AdminContainer";
import Table from "../components/Table/Table";
import ModalAdmin from "../components/Modal/ModalAdmin";

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
                                    <button
                                        className="btn btn-sm btn-warning me-4 mb-2"
                                        data-bs-toggle="modal" data-bs-target="#modalAdmin"
                                        onClick={() => {
                                            setShowModal(true)
                                            setCurrentOrderID(order.id)
                                        }}
                                    >
                                        Modifier
                                    </button>
                                    <button className="btn btn-sm btn-primary me-4 mb-2">Fiche commande</button>
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
            const data = await OrderAPI.findAll();
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
            await OrderAPI.deleteOrder(id);
        } catch (error) {
            setOrders(originalOrders);
            console.log(error.response);
        }
    }

    return (
        <AdminContainer title="Gestion des commandes">
            <Table
                header={tableHeader}
                tableData={tableData}
            />
            <ModalAdmin
                setShowModal={setShowModal}
            >
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Détails de la commande</h3>

                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-bs-dismiss="modal" aria-label="Close">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h3 className="d-inline-block d-sm-none">User</h3>
                                <div className="col-12">
                                    <h3>{order.user?.firstname + " " + order.user?.lastname}</h3>
                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>Email</b> <a className="float-right">{order.user?.email}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Adresse</b> <a className="float-right">{order.user?.address}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Code postal</b> <a className="float-right">{order.user?.zipCode}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Ville</b> <a className="float-right">{order.user?.city}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <h3 className="d-inline-block d-sm-none">Informations de la commande</h3>
                                <div className="col-12">
                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>Numéro de commande</b> <a className="float-right">{order.id}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Date de la commande</b> <a
                                            className="float-right">{order.confirmedAt}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Statut</b> <a className="float-right">{order.status}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Montant total</b> <a className="float-right">{order.total}</a>
                                        </li>
                                    </ul>
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