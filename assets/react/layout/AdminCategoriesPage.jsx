import React, {useEffect, useState} from 'react';
import Table from "../components/Table/Table";
import CategoryAPI from "../services/CategoryAPI";
import AdminContainer from "../components/Container/AdminContainer";
import ButtonModal from "../components/Modal/ButtonModal";
import ModalAdmin from "../components/Modal/ModalAdmin";
import AdminForm from "../components/Form/AdminForm";

function AdminCategoriesPage(props) {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [tableData, setTableData] = useState([]);
    const [formType, setFormType] = useState("add");
    const [showModal, setShowModal] = useState(false);
    const [currentCategoryID, setCurrentCategoryID] = useState(null);


    const tableHeader = [
        {id: 1, name: '#'},
        {id: 2, name: 'Catégories'},
        {id: 3, name: 'Description'},
        {id: 4, name: 'Action'},
    ];

    const getDataTable = () => {
        if (categories) {
            return categories.map((category, index) => (
                    [
                        {value: index + 1},
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
            setCategories(data)
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

    const handleAdd = (data) => {
        console.log(data)
    }

    const handleEdit = (data) => {
        console.log(data)
    }

    const handleDelete = (id) => {
        const originalCategories = [...categories];
        setCategories(categories.filter(category => category.id !== id));
        try {
            CategoryAPI.deleteCategory(id);
        } catch (error) {
            setCategories(originalCategories);
            console.error(error)
        }
    }

    return (
        <AdminContainer title="Gestion des catégories">
            <ButtonModal
                buttonLabel="Ajouter une catégorie"
                setFormType={setFormType}
                setShowModal={setShowModal}
            />
            <Table
                tableHeader={tableHeader}
                tableData={tableData}
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
        </AdminContainer>
    );
}

export default AdminCategoriesPage;