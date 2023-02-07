import React, {useEffect, useState} from 'react';
import Table from "../components/Table/Table";
import Searchbar from "../components/Searchbar/Searchbar";
import ProductAPI from "../services/ProductAPI";

function AdminPage(props) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const getRequest = async () => {
        switch (props.useCase) {
            case "products":
                return await ProductAPI.getAllProducts();
            case "categories":
                return await ProductAPI.getAllCategories();
            case "users":
                return await ProductAPI.getAllUsers();
            default:
                return await ProductAPI.getAllProducts();

        }
    }


    const getData = async () => {

        try {
            const request = await getRequest();
            setData(request)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        console.log(data)
    }, [data]);

    return (
        <>
            <Searchbar data={data}/>
            <Table data={data}/>

        </>
    );
}

export default AdminPage;