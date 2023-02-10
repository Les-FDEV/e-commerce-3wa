import React, {useEffect,  useState} from 'react';
import Table from "../components/Table/Table";
import CategoryAPI from "../services/CategoryAPI";
import AdminContainer from "../components/Container/AdminContainer";
import ButtonModal from "../components/Modal/ButtonModal";
import ModalAdmin from "../components/Modal/ModalAdmin";
import AdminForm from "../components/Form/AdminForm";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OrderAPI from "../services/OrderAPI";
import Pagination from "../components/Pagination/Pagination";


function AdminCategoriesPage(props) {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [pageList, setPageList] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [formType, setFormType] = useState("add");
    const [showModal, setShowModal] = useState(false);
    const [currentCategoryID, setCurrentCategoryID] = useState(null);

    const notify = (message) => toast.success(
        message,
        {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
    );

    const tableHeader = [
        {id: 1, name: '#'},
        {id: 2, name: 'Catégories'},
        {id: 3, name: 'Description'},
        {id: 4, name: 'Action'},
    ];

    const getDataTable = () => {
        if (categories) {
            return categories.map((category) => (
                    [
                        {value: category.id},
                        {value: category.name},
                        {value: category.description},
                        {
                            value: (
                                <>
                                    <button
                                        className="btn btn-sm btn-danger inline me-4 mb-2"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        Supprimer
                                    </button>
                                    <button
                                        className="btn btn-sm btn-warning me-4 mb-2"
                                        data-bs-toggle="modal" data-bs-target="#modalAdmin"
                                        onClick={() => {
                                            setFormType("edit")
                                            setShowModal(true)
                                            setCurrentCategoryID(category.id)
                                        }}
                                    >
                                        Modifier
                                    </button>
                                </>
                            )
                        }
                    ]
                )
            );
        }
    }

    const getCategoriesData = async () => {
        try {
            const data = await CategoryAPI.getAllCategories();
            console.log(data)
            setCategories(data['hydra:member']);
            setPageList(data['hydra:view']);
        } catch (error) {
            console.error(error)
        }
    }

    const getCategoryData = async () => {
        try {
            const data = await CategoryAPI.getCategory(currentCategoryID);
            setCategory(data)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getCategoriesData();
    }, []);

    useEffect(() => {
        console.log(categories)
        setTableData(getDataTable());
    }, [categories]);

    useEffect(() => {
        if (formType === "edit") {
            getCategoryData();
        }
    }, [currentCategoryID])


    const categoryFields = [
        {
            id: 1,
            name: "name",
            label: "Nom de la catégorie",
            type: "text",
            placeholder: "Nom de la catégorie",
            value: category.name ?? ""
        },
        {
            id: 2,
            name: "description",
            label: "Description",
            type: "textarea",
            placeholder: "Description de la catégorie",
            value: category.description ?? ""
        },
    ];

    const handleAdd = async (data) => {
        try {
            const response = await CategoryAPI.createCategory(data);
            if (response.status === 201) {
                setCategories([response.data, ...categories]);
                setShowModal(false);
                notify("La catégorie a bien été ajoutée")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = async (data) => {
        try {
            const response = await CategoryAPI.updateCategory(currentCategoryID, data);
            console.log(response)
            if (response.status === 200) {
                setCategories(categories.map(category => category.id === currentCategoryID ? response.data : category));
                setShowModal(false);
                notify("La catégorie a bien été modifiée")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (id) => {
        const originalCategories = [...categories];
        setCategories(categories.filter(category => category.id !== id));
        try {
            const {status} = await CategoryAPI.deleteCategory(id);
            console.log(status)
            if (status === 204) {
                console.log("La catégorie a bien été supprimée")
                notify("La catégorie a bien été supprimée")
            }
        } catch (error) {
            setCategories(originalCategories);
            console.error(error)
        }
    }

    const handlePageChange = async (page) => {
        try {
            const data = await OrderAPI.getOrderByPage(page);
            setCategories(data['hydra:member']);
            setPageList(data['hydra:view']);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <>
            <AdminContainer title="Gestion des catégories">
                <ButtonModal
                    buttonLabel="Ajouter une catégorie"
                    setFormType={setFormType}
                    setShowModal={setShowModal}
                />
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
                {showModal && (
                    <ModalAdmin
                        formType={formType}
                        setShowModal={setShowModal}
                    >
                        <AdminForm
                            formFields={categoryFields}
                            formType={formType}
                            formSubmit={formType === "add" ? handleAdd : handleEdit}
                        />
                    </ModalAdmin>
                )}
                <ToastContainer/>
            </AdminContainer>
        </>
    );
}

export default AdminCategoriesPage;