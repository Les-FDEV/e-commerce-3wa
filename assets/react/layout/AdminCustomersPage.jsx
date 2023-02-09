import React, {useEffect, useState} from 'react';
import CustomerAPI from "../services/CustomerAPI";
import AdminContainer from "../components/Container/AdminContainer";
import Table from "../components/Table/Table";
import ModalAdmin from "../components/Modal/ModalAdmin";
import AdminForm from "../components/Form/AdminForm";

function AdminCustomersPage() {
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState({})
    const [tableData, setTableData] = useState([])
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
            return customers.map((customer, index) => (
                    [
                        {value: index + 1},
                        {value: customer.lastname},
                        {value: customer.firstname},
                        {value: customer.email},
                        {value: customer.phone},
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
            setCustomers(data)
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

    return (
        <AdminContainer title="Gestion des clients">
            <Table
                header={tableHeader}
                tableData={tableData}
            />
            <ModalAdmin
                setShowModal={setShowModal}
            >
            </ModalAdmin>
        </AdminContainer>
    );
}

export default AdminCustomersPage;