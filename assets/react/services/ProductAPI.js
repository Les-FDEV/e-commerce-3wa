import axios from "axios";
import {PRODUCT_URL} from "../config/config.js";

const getAllProducts = () => {
    return axios.get(PRODUCT_URL)
        .then(response => response.data)
}

const getProduct = (id) => {
    return axios.get(PRODUCT_URL + "/" + id)
        .then(response => response.data)
        .catch(error => error);
}

const createProduct = (product) => {
    return axios.post(PRODUCT_URL, product)
        .then(response => response)
        .catch(error => error);
}

const updateProduct = (id, product) => {
    return axios.put(PRODUCT_URL + "/" + id, product)
        .then(response => response)
        .catch(error => error);
}

const deleteProduct = (id) => {
    return axios.delete(PRODUCT_URL + "/" + id)
        .then(response => response)
}

export default {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}