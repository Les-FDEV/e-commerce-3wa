import {CUSTOMER_URL} from "../config/config";
import axios from "axios";


const getAllCustomers = () => {
    return axios.get(CUSTOMER_URL)
        .then(response => response.data)
}

const getCustomer = (id) => {
    return axios.get(CUSTOMER_URL + "/" + id)
        .then(response => response.data)
}

const createCustomer = (customer) => {
    return axios.post(CUSTOMER_URL, customer)
        .then(response => response.data)
}

const updateCustomer = (id, customer) => {
    return axios.put(CUSTOMER_URL + "/" + id, customer)
        .then(response => response.data)
}

const deleteCustomer = (id) => {
    return axios.delete(CUSTOMER_URL + "/" + id)
        .then(response => response.data)
        .catch(error => console.log(error));
}

export default {
    getAllCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
}