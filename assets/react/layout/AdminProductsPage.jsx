import React, {useEffect, useState} from 'react';
import Table from "../components/Table/Table";
import ProductAPI from "../services/ProductAPI";

function AdminProductPage(props) {
    const [products, setProducts] = useState([]);
    const [tableData, setTableData] = useState([]);

    const tableHeader = [
        {id: 1, name: '#'},
        {id: 2, name: 'Catégories'},
        {id: 3, name: 'Produits'},
        {id: 4, name: 'Stock'},
        {id: 5, name: 'Action'},
    ];

    // create an array, for each value of the array, we will an create an object, this object have a key nammed "value"
    // and the value of the key is the value corresponding to name of the tableHeader

    const setDataTable = () => {
        if (products) {
            const data = products.map((product, index) => (
                    [
                        {value: index + 1},
                        {
                            value: product?.categories?.map((category, index) => (
                                    <span key={index} className="badge text-bg-primary">{category.name}</span>
                                )
                            )
                        },
                        {value: product.name},
                        // {value: product.characteristics?[0].stock},
                        {
                            value: (
                                <>
                                    <button className="btn btn-sm btn-danger inline me-4">Supprimer</button>
                                    <button className="btn btn-sm btn-warning me-4">Modifier</button>
                                    <a href="#" className="btn btn-sm btn-primary me-4">Fiche produit</a>
                                </>
                            )
                        }
                    ]
                )
            );
            setTableData(data);
        }
    }

    const getData = async () => {

        try {
            const data = await ProductAPI.getAllProducts();
            setProducts(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setDataTable();
    }, [products]);

    useEffect(() => {
        console.log(tableData)
    }, [tableData]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col min-vh-100 p-4">
                    <button className="btn float-end" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"
                            role="button">
                        <i className="bi bi-arrow-right-square-fill fs-3" data-bs-toggle="offcanvas"
                           data-bs-target="#offcanvas"></i>
                    </button>
                    <Table tableHeader={tableHeader} tableData={tableData}/>
                </div>
            </div>
        </div>
    );
}

export default AdminProductPage;