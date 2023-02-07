import React, {useEffect, useState} from 'react';
import ProductAPI from "../../services/ProductAPI";

function Table({useCase}) {
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            const data = await ProductAPI.getAllProducts();
            setProducts(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        console.log(products)
    }, [products]);

    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Catégories</th>
                <th scope="col">Produits</th>
                <th scope="col">Stock</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            {
                products.map((product, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                {product.categories
                                    .map((category, index) =>
                                        <span key={index} className="badge badge-primary">{category.name}</span>
                                    )
                                }
                            </td>
                            <td>{product.name}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button className="btn btn-sm btn-danger">Supprimer</button>
                            </td>
                        </tr>
                    )
                )
            }
            </tbody>
        </table>
    )
        ;
}

export default Table;