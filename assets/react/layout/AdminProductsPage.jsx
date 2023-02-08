import React, {useEffect, useState} from 'react';
import Table from "../components/Table/Table";
import ProductAPI from "../services/ProductAPI";
import AdminContainer from "../components/Container/AdminContainer";
import ModalAdmin from "../components/Modal/ModalAdmin";
import AdminForm from "../components/Form/AdminForm";
import CategoryAPI from "../services/CategoryAPI";
import ButtonModal from "../components/Modal/ButtonModal";

function AdminProductsPage(props) {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [formType, setFormType] = useState("add");
    const [showModal, setShowModal] = useState(false);
    const [currentProductID, setCurrentProductID] = useState(null);

    // Le code pour remplir le tableau de data

    const tableHeader = [
        {id: 1, name: '#'},
        {id: 2, name: 'Catégories'},
        {id: 3, name: 'Produits'},
        {id: 4, name: 'Stock'},
        {id: 5, name: 'Action'},
    ];

    const getDataTable = () => {
        if (products) {
            console.log(products)
            return products.map((product, index) => (
                    [
                        {value: index + 1},
                        {
                            value: product?.categories?.map((category, index) => (
                                    <span key={index} className="badge text-bg-primary">{category.name}</span>
                                )
                            )
                        },
                        {value: product.name},
                        {value: product.characteristics[0].stock},
                        {
                            value: (
                                <>
                                    <button
                                        className="btn btn-sm btn-danger inline me-4 mb-2"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Supprimer
                                    </button>
                                    <button
                                        className="btn btn-sm btn-warning me-4 mb-2"
                                        data-bs-toggle="modal" data-bs-target="#modalAdmin"
                                        onClick={() => {
                                            setFormType("edit")
                                            setShowModal(true)
                                            setCurrentProductID(product.id)
                                        }}
                                    >
                                        Modifier
                                    </button>
                                    <button className="btn btn-sm btn-primary me-4 mb-2">Fiche produit</button>
                                </>
                            )
                        }
                    ]
                )
            );
        }
    }

    const getProductsData = async () => {
        try {
            const data = await ProductAPI.getAllProducts();
            setProducts(data)
        } catch (error) {
            console.error(error)
        }
    }

    const getProductData = async () => {
        try {
            const data = await ProductAPI.getProduct(currentProductID);
            setProduct(data)
        } catch (error) {
            console.error(error)
        }
    }

    const getCategoriesData = async () => {
        try {
            const data = await CategoryAPI.getAllCategories()
            setCategories(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);


    useEffect(() => {
        if (showModal && categories.length === 0) {
            getCategoriesData();
        }
    }, [showModal])

    useEffect(() => {
        if (formType === "edit") {
            getProductData();
        }
    }, [currentProductID])


    useEffect(() => {
        setTableData(getDataTable());
    }, [products]);

    // Le code pour préparer le formulaire de création/édition de produit

    // const productFields = [
    //     {
    //         id: 1,
    //         name: 'name',
    //         label: 'Nom du produit',
    //         type: 'text',
    //         placeholder: 'Nom du produit',
    //         value: product.name ?? '',
    //     },
    //     {
    //         id: 2,
    //         name: 'description',
    //         label: 'Description',
    //         type: 'textarea',
    //         placeholder: 'Description du produit',
    //         value: product.description ?? '',
    //     },
    //     {
    //         id: 3,
    //         name: 'price',
    //         label: 'Prix',
    //         type: 'number',
    //         value: product.price ?? '',
    //     },
    //     {
    //         id: 4,
    //         name: 'stock',
    //         label: 'Stock',
    //         type: 'number',
    //         value: product.stock ?? '',
    //     },
    //     {
    //         id: 4,
    //         name: 'color',
    //         label: 'Couleur',
    //         type: 'text',
    //         placeholder: 'Couleur du produit',
    //         value: product.color ?? '',
    //     },
    //     {
    //         id: 5,
    //         name: 'categories',
    //         label: 'Catégories',
    //         type: 'select',
    //         options: categories.map((category) => (
    //             {id: category.id, name: category.name}
    //         )),
    //         value: product.categories ? product.categories.map((category) => (
    //             {id: category.id, name: category.name}
    //         )) : null,
    //         defaultValue: "Veuillez saisir une ou plusieurs catégories",
    //         multiple: true,
    //
    //     },
    // ];

    const handleAdd = async (data) => {
        try {
            const response = await ProductAPI.createProduct(data);

            if (response.status === 201) {
                setProducts([...products, response.data]);
                setShowModal(false)
            }
        } catch (error) {
            console.error(error)
        }
    }


    const handleEdit = async (data) => {
        const originalProducts = [...products];
        const index = products.findIndex(product => product.id === data.id);
        const newProducts = [...products];
        newProducts[index] = data;
        setProducts(newProducts);
        try {
            const response = await ProductAPI.updateProduct(data);

            if (response.status === 200) {
                setShowModal(false)

            }
        } catch (error) {
            setProducts(originalProducts);
            console.error(error);
        }
    }


    // Suppression d'un produit

    const handleDelete = async (id) => {
        const originalProducts = [...products];
        setProducts(products.filter(product => product.id !== id));
        try {
            await ProductAPI.deleteProduct(id);
        } catch (error) {
            setProducts(originalProducts);
            console.error(error);
        }
    }


    return (
        <AdminContainer title="Gestion des produits">
            {/*<ButtonModal*/}
            {/*    buttonLabel="Ajouter un produit"*/}
            {/*    setShowModal={setShowModal}*/}
            {/*    setFormType={setFormType}*/}
            {/*/>*/}
            {/*<Table*/}
            {/*    tableHeader={tableHeader}*/}
            {/*    tableData={tableData}*/}
            {/*/>*/}
            {/*<ModalAdmin*/}
            {/*    formType={formType}*/}
            {/*    setShowModal={setShowModal}*/}
            {/*>*/}
            {/*    <AdminForm*/}
            {/*        formType={formType}*/}
            {/*        formFields={productFields}*/}
            {/*        formSubmit={formType === "add" ? handleAdd : handleEdit}*/}
            {/*    />*/}
            {/*</ModalAdmin>*/}
        </AdminContainer>
    );
}

export default AdminProductsPage;