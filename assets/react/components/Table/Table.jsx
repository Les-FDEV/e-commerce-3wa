import React, {useEffect, useState} from 'react';
import ProductAPI from "../../services/ProductAPI";

function Table({data}) {

    //create an array row with the keys of the first object of the data array

    const row = Object.keys(data).map((key, index) => (
            console.log(key)
        ))
    ;

    return (
        <table className="table">
            <thead>
            <tr>
                {row}
            </tr>
            </thead>
            <tbody>
            {
                data.map((data, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                {/*{product.categories*/}
                                {/*    .map((category, index) =>*/}
                                {/*        <span key={index} className="badge text-bg-primary">{category.name}</span>*/}
                                {/*    )*/}
                                {/*}*/}
                            </td>
                            <td>{data.name}</td>
                            <td>{data.characteristics[0].stock}</td>
                            <td>
                                <button className="btn btn-sm btn-danger inline me-4">Supprimer</button>
                                <button className="btn btn-sm btn-warning me-4">Modifier</button>
                                <a href="#" className="btn btn-sm btn-primary me-4">Fiche produit</a>
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