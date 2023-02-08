import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import OrderAPI from "../services/OrderAPI";
import AdminContainer from "../components/Container/AdminContainer";
import ButtonModal from "../components/Modal/ButtonModal";
import Table from "../components/Table/Table";
import ModalAdmin from "../components/Modal/ModalAdmin";
import AdminForm from "../components/Form/AdminForm";

function AdminOrdersPage(props) {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [tableData, setTableData] = useState([]);
    const [formType, setFormType] = useState("add");
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
            let Paiement;
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
                            value: (order.status === "PAID" ? (
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
                                            setFormType("edit")
                                            setShowModal(true)
                                            setCurrentOrderID(order.id)
                                        }}
                                    >
                                        Modifier
                                    </button>
                                    <button className="btn btn-sm btn-primary me-4 mb-2">Fiche Client</button>
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
        if (formType === "edit") {
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
                formType={formType}
                setShowModal={setShowModal}
            >
                <AdminForm
                    formType={formType}
                    // formFields={}
                    // formSubmit={}
                />
            </ModalAdmin>
        </AdminContainer>
    );
}

export default AdminOrdersPage;