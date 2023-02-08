import {ORDER_URL} from "../config/config";
import axios from "axios";

const getAllOrders = () => {
    return axios.get(ORDER_URL)
        .then(response => response.data['hydra:member'])
        .catch(error => console.log(error));
}

const getOrder = (id) => {
    return axios.get(ORDER_URL + "/" + id)
        .then(response => response.data)
        .catch(error => console.log(error));
}

const createOrder = (order) => {
    return axios.post(ORDER_URL, order)
        .then(response => response.data)
        .catch(error => console.log(error));
}

const updateOrder = (id, order) => {
    return axios.put(ORDER_URL + "/" + id, order)
        .then(response => response.data)
        .catch(error => console.log(error));
}

const deleteOrder = (id) => {
    return axios.delete(ORDER_URL + "/" + id)
        .then(response => response.data)
        .catch(error => console.log(error));
}

export default {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}