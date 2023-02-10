import React, {useEffect, useState} from 'react';
import Table from "../components/Table/Table";
import ProductAPI from "../services/ProductAPI";
import AdminContainer from "../components/Container/AdminContainer";
import ModalAdmin from "../components/Modal/ModalAdmin";
import AdminForm from "../components/Form/AdminForm";
import CategoryAPI from "../services/CategoryAPI";
import ButtonModal from "../components/Modal/ButtonModal";
import CharacteristicsAPI from "../services/CharacteristicsAPI";
import {CATEGORY_PRODUCTS_URL, CATEGORY_URL, CHARACTERISTIC_PRODUCTS_URL, CHARACTERISTICS_URL} from "../config/config";
import CharacteristicProductsAPI from "../services/CharacteristicProductsAPI";
import {toast, ToastContainer} from "react-toastify";
import OrderAPI from "../services/OrderAPI";
import Pagination from "../components/Pagination/Pagination";

function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [pageList, setPageList] = useState([]);
    const [formType, setFormType] = useState("add");
    const [showModal, setShowModal] = useState(false);
    const [currentProductID, setCurrentProductID] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedWeight, setSelectedWeight] = useState([]);
    const [selectedColor, setSelectedColor] = useState([]);

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
            return products.map((product, index) => (
                    [
                        {value: product.id},
                        {
                            value: product?.categories?.map((category, index) => (
                                    <span key={index} className="badge text-bg-primary">{category.name}</span>
                                )
                            )
                        },
                        {value: product.name},
                        {value: product?.characteristicProducts[0]?.stock ?? "Non renseigné"},
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
            setProducts(data['hydra:member']);
            setPageList(data['hydra:view'])
        } catch (error) {
            console.error(error)
        }
    }

    const getProductData = async () => {
        try {
            console.log('getProductData currentProductID',currentProductID)
            const data = await ProductAPI.getProduct(currentProductID)
            setProduct(data)
        } catch (error) {
            console.error(error)
        }
    }

    const getCategoriesData = async () => {
        try {
            const data = await CategoryAPI.getAllCategories()
            setCategories(data['hydra:member'])
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
        console.log("currentProductID",currentProductID)
        if (formType === "edit") {
            console.log("edit")
            getProductData().then()
        }
    }, [currentProductID])


    useEffect(() => {
        setTableData(getDataTable());
    }, [products]);


    const productFields = [
        {
            id: 1,
            name: 'name',
            label: 'Nom du produit',
            type: 'text',
            placeholder: 'Nom du produit',
            value: product.name ?? '',
        },
        {
            id: 2,
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Description du produit',
            value: product.description ?? '',
        },
        {
            id: 3,
            name: 'file',
            label: 'Image',
            type: 'file',
            value: product.image ?? '',
        },
        {
            id: 3,
            name: 'price',
            label: 'Prix',
            type: 'number',
            value: product.characteristicProducts ? product.characteristicProducts[0].price : '',
        },
        {
            id: 4,
            name: 'stock',
            label: 'Stock',
            type: 'number',
            value: product.characteristicProducts ? product.characteristicProducts[0].stock : '',
        },
        {
            id: 5,
            name: 'weight',
            label: 'Poids',
            type: 'select',
            options: [
                {label: "moins de 500g", value: "moins de 500g", ormValue: "weight"},
                {label: "500g à 1kg", value: "500g à 1kg", ormValue: "weight"},
                {label: "1kg à 2kg", value: "1kg à 2kg", ormValue: "weight"},
                {label: "2kg à 3kg", value: "2kg à 3kg", ormValue: "weight"},
                {label: "plus de 3kg", value: "plus de 3kg", ormValue: "weight"}
            ],
            value: product.characteristicProducts ?
                product.characteristicProducts.map((characteristicProduct) =>
                    characteristicProduct.characteristic.name === "weight" ? (
                        {
                            label: characteristicProduct.characteristic.value,
                            value: characteristicProduct.characteristic.id,
                            ormValue: "weight"
                        }
                    ) : null)
                : null,
            multiple: false,
        },
        {
            id: 6,
            name: 'color',
            label: 'Couleur',
            type: 'select',
            options: [
                {label: "Blanc", value: "Blanc", ormValue: "color"},
                {label: "Noir", value: "Noir", ormValue: "color"},
                {label: "Rouge", value: "Rouge", ormValue: "color"},
                {label: "Bleu", value: "Bleu", ormValue: "color"},
                {label: "Vert", value: "Vert", ormValue: "color"},
                {label: "Jaune", value: "Jaune", ormValue: "color"},
                {label: "Orange", value: "Orange", ormValue: "color"},
                {label: "Rose", value: "Rose", ormValue: "color"},
                {label: "Violet", value: "Violet", ormValue: "color"},
                {label: "Gris", value: "Gris", ormValue: "color"},
                {label: "Marron", value: "Marron", ormValue: "color"},
                {label: "Autre", value: "Autre", ormValue: "color"}
            ],
            value: product.characteristicProducts ?
                product.characteristicProducts.map((characteristicProduct) =>
                    characteristicProduct.characteristic.name === "color" ? (
                        {
                            label: characteristicProduct.characteristic.value,
                            value: characteristicProduct.characteristic.id,
                            ormValue: "color"
                        }
                    ) : null)
                : null,
            multiple: false,
        },
        {
            id: 5,
            name: 'categories',
            label: 'Catégories',
            type: 'select',
            options: categories.map((category) => (
                {label: category.name, value: category.id}
            )),
            value: product.categories ? product.categories.map((category) => (
                {label: category.name, value: category.id}
            )) : null,
            defaultValue: "Veuillez saisir une ou plusieurs catégories",
            multiple: true,
        },
    ];

    const handleAdd = async (data) => {
        const characteristics = [
            selectedColor,
            selectedWeight,
        ]

        let characteristicProducts = [];
        for (const characteristic of characteristics) {
            console.log(characteristic)
            const newCharacteristic = {
                name: characteristic.ormValue,
                value: characteristic.value,
            }
            try {
                const response = await CharacteristicsAPI.createCharacteristic(newCharacteristic)
                console.log(response)
                if (response.status === 201) {
                    const newCharacteristicProducts = {
                        price: data.price,
                        stock: parseFloat(data.stock),
                        characteristic: CHARACTERISTICS_URL + "/" + response.data.id,
                    }
                    const lastResponse = await CharacteristicProductsAPI.createCharacteristicProduct(newCharacteristicProducts)
                    characteristicProducts.push(lastResponse.data)
                }
            } catch (error) {
                console.error(error)
            }
        }

        const newProduct = {
            name: data.name,
            description: data.description,
            categories: selectedCategories.map(
                (category) => {
                    return CATEGORY_URL + "/" + category.value
                }
            ),
            characteristicProducts: characteristicProducts.map(
                (characteristicProduct) => {
                    return CHARACTERISTIC_PRODUCTS_URL + "/" + characteristicProduct.id
                }
            )
        }


        try {
            let response = await ProductAPI.createProduct(newProduct);

            if (typeof data.file === "object") {
                const formData = new FormData();
                console.log(data.file[0])
                formData.append("file", data.file[0]);
                response = await ProductAPI.createProductImage(response.data.id, formData);
            }

            if (response.status === 201) {
                setProducts([response.data, ...products]);
                toast.success("Le produit a bien été ajouté")
                setShowModal(false)
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleEdit = async (data) => {
        //verify if characteristic has been changed
        const characteristics = [
            selectedColor,
            selectedWeight,
        ]

        let characteristicProducts = [];
        for (const characteristic of characteristics) {
            console.log(characteristic)
            const newCharacteristic = {
                name: characteristic.ormValue,
                value: characteristic.value,
            }
            try {
                const response = await CharacteristicsAPI.createCharacteristic(newCharacteristic)

                if (response.status === 201) {
                    const updateCharacteristicProducts = {
                        price: data.price,
                        stock: parseFloat(data.stock),
                        characteristic: CHARACTERISTICS_URL + "/" + response.data.id,
                    }
                    const lastResponse = await CharacteristicProductsAPI.createCharacteristicProduct(updateCharacteristicProducts)
                    characteristicProducts.push(lastResponse.data)
                }
            } catch (error) {
                console.error(error)
            }
        }

        const updateProduct = {
            name: data.name,
            description: data.description,
            categories: selectedCategories.map(
                (category) => {
                    return CATEGORY_URL + "/" + category.value
                }
            ),
            characteristicProducts: characteristicProducts.map(
                (characteristicProduct) => {
                    return CHARACTERISTIC_PRODUCTS_URL + "/" + characteristicProduct.id
                }
            )
        }


        try {
            let response = await ProductAPI.updateProduct(currentProductID, updateProduct);

            if (typeof data.file === "object") {
                const formData = new FormData();
                formData.append("file", data.file[0]);
                response = await ProductAPI.createProductImage(response.data.id, formData);

            }

            if (response.status === 201) {
                setProducts([response.data, ...products]);
                toast.success("Le produit a bien été ajouté")
                setShowModal(false)
            }
        } catch
            (error) {
            console.error(error);
        }
    }


// Suppression d'un produit

    const handleDelete = async (id) => {
        const originalProducts = [...products];
        setProducts(products.filter(product => product.id !== id));
        try {
            const response = await ProductAPI.deleteProduct(id);

            if (response.status === 204) {
                toast.success("Le produit a bien été supprimé")
            }
        } catch (error) {
            setProducts(originalProducts);
            console.error(error);
        }
    }

    const handlePageChange = async (page) => {
        try {
            const data = await OrderAPI.getOrderByPage(page);
            console.log(data)
            setProducts(data['hydra:member']);
            setPageList(data['hydra:view']);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <AdminContainer title="Gestion des produits">
            <ButtonModal
                buttonLabel="Ajouter un produit"
                setShowModal={setShowModal}
                setFormType={setFormType}
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
            <ModalAdmin
                formType={formType}
                setFormType={setFormType}
                setShowModal={setShowModal}
                setProduct={setProduct}
            >
                <AdminForm
                    formType={formType}
                    formFields={productFields}
                    formSubmit={formType === "add" ? handleAdd : handleEdit}
                    setSelectedCategories={setSelectedCategories}
                    selectedCategories={selectedCategories}
                    setSelectedColor={setSelectedColor}
                    selectedColor={selectedColor}
                    setSelectedWeight={setSelectedWeight}
                    selectedWeight={selectedWeight}
                    currentId={currentProductID}
                    isSubmit={showModal}
                />
            </ModalAdmin>
            <ToastContainer/>
        </AdminContainer>
    );
}

export default AdminProductsPage;