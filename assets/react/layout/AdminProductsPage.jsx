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
import {toast} from "react-toastify";

function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [characteristicProducts, setCharacteristicProducts] = useState([]);
    const [tableData, setTableData] = useState([]);
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
                        {value: index + 1},
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
            value: product.characteristicProducts ? product.characteristicProducts[0].weight : '',
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

        for (const characteristic of characteristics) {
            for (const [key, value] of Object.entries(characteristic)) {
                const newCharacteristic = {
                    name: value.ormValue,
                    value: value.value,
                }
                try {
                    const response = await CharacteristicsAPI.createCharacteristic(newCharacteristic)
                    console.log(response)

                    if (response.status === 201) {
                        const characteristicProducts = {
                            price: data.price,
                            stock: parseFloat(data.stock),
                            characteristic: CHARACTERISTICS_URL + "/" + response.data.id,
                        }
                        const lastResponse = await CharacteristicProductsAPI.createCharacteristicProduct(characteristicProducts)
                        setCharacteristicProducts(lastResponse.data)
                    }
                } catch (error) {
                    console.error(error)
                }
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
            const response = await ProductAPI.createProduct(newProduct);
            console.log(response)
        } catch (error) {
            console.error(error);
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
            const response = await ProductAPI.deleteProduct(id);

            if (response.status === 200) {
                setShowModal(false)
            }
        } catch (error) {
            setProducts(originalProducts);
            console.error(error);
        }
    }


    return (
        <AdminContainer title="Gestion des produits">
            <ButtonModal
                buttonLabel="Ajouter un produit"
                setShowModal={setShowModal}
                setFormType={setFormType}
            />
            <Table
                tableHeader={tableHeader}
                tableData={tableData}
            />
            <ModalAdmin
                formType={formType}
                setShowModal={setShowModal}
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
                />
            </ModalAdmin>
        </AdminContainer>
    );
}

export default AdminProductsPage;