import React, {useEffect, useState} from 'react';
import CustomerAPI from "../services/CustomerAPI";
import AdminContainer from "../components/Container/AdminContainer";
import Table from "../components/Table/Table";
import ModalAdmin from "../components/Modal/ModalAdmin";
import AdminForm from "../components/Form/AdminForm";
import Pagination from "../components/Pagination/Pagination";
import OrderAPI from "../services/OrderAPI";
import moment from "moment/moment";

function AdminCustomersPage() {
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState({})
    const [tableData, setTableData] = useState([])
    const [pageList, setPageList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentCustomerID, setCurrentCustomerID] = useState(null)

    const tableHeader = [
        {id: 1, name: '#'},
        {id: 2, name: 'Nom'},
        {id: 3, name: 'Prénom'},
        {id: 4, name: 'Email'},
        {id: 5, name: 'Téléphone'},
        {id: 6, name: 'Action'},
    ];

    const getDataTable = () => {
        if (customers) {
            return customers.map((customer) => (
                    [
                        {value: customer.id},
                        {value: customer.lastname},
                        {value: customer.firstname},
                        {value: customer.email},
                        {value: customer.phoneNumber},
                        {
                            value: (
                                <>
                                    <button
                                        className="btn btn-sm btn-danger inline me-4 mb-2"
                                        onClick={() => handleDelete(customer.id)}
                                    >
                                        Supprimer
                                    </button>
                                    <button
                                        className="btn btn-sm btn-primary me-4 mb-2"
                                        data-bs-toggle="modal" data-bs-target="#modalAdmin"
                                        onClick={() => {
                                            setShowModal(true)
                                            setCurrentCustomerID(customer.id)
                                        }}
                                    >
                                        Fiche client
                                    </button>
                                </>
                            )
                        }
                    ]
                )
            )
                ;
        }
    }

    const getCustomersData = async () => {
        try {
            const data = await CustomerAPI.getAllCustomers()
            setCustomers(data['hydra:member']);
            setPageList(data['hydra:view']);
        } catch (e) {
            console.log(e)
        }
    }

    const getCustomerData = async () => {
        try {
            const data = await CustomerAPI.getCustomer(currentCustomerID)
            setCustomer(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCustomersData()
    }, [])

    useEffect(() => {
        setTableData(getDataTable())
    }, [customers])

    useEffect(() => {
        if (currentCustomerID) {
            getCustomerData()
        }
    }, [currentCustomerID])

    useEffect(() => {
        console.log(customer)
    }, [customer])

    const handleDelete = async (id) => {
        const originalCustomers = [...customers]
        setCustomers(customers.filter(customer => customer.id !== id))
        try {
            await CustomerAPI.deleteCustomer(id)
        } catch (e) {
            setCustomers(originalCustomers)
            console.log(e)
        }
    }

    const handlePageChange = async (page) => {
        try {
            const data = await OrderAPI.getOrderByPage(page);
            console.log(data)
            setCustomers(data['hydra:member']);
            setPageList(data['hydra:view']);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <AdminContainer title="Gestion des clients">
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
                        <h4 className="card-title">Fiche client #{customer.id}</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <h5>Client</h5>
                                <div className="col-12">
                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>Email</b> <span className="float-right">{customer.email}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Nom</b> <span className="float-right">{customer.lastname}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Prénom</b> <span className="float-right">{customer.firstname}</span>
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
                                            {customer.addresses &&
                                                customer.addresses.map(
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
                                <h5>Commandes</h5>
                                <div className="col-12">
                                    <ul className="list-group list-group-unbordered mb-3">
                                        {customer.orders &&
                                            customer.orders.map(
                                                (order, index) => (
                                                    <li key={index} className="list-group-item">
                                                        <h6>
                                                            <b>Commande {index + 1}
                                                            </b>
                                                        </h6>
                                                        <ul>
                                                            <li className="list-group-item">
                                                                <b>Numéro de commande</b> <span
                                                                className="float-right">{order.id}</span>
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
                                                                        <span
                                                                            className="badge text-bg-info">Envoyé</span>
                                                                    ) : (order.statut === "livré" ? (
                                                                            <span
                                                                                className="badge text-bg-success">Livré</span>

                                                                        ) : null
                                                                    )
                                                                )
                                                            ))}</span>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <b>Montant total</b> <span
                                                                className="float-right">{order.total} €</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                )
                                            )
                                        }
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

export default AdminCustomersPage;