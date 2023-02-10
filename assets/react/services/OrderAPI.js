import {API_URL, ORDER_URL} from "../config/config";
import axios from "axios";

const getAllOrders = () => {
    return axios.get(ORDER_URL)
        .then(response => response.data)
}

const getOrder = (id) => {
    return axios.get(ORDER_URL + "/" + id)
        .then(response => response.data)
}

const getOrderByPage = (page) => {
    return axios.get(API_URL + page)
        .then(response => response.data)
}

const createOrder = (order) => {
    return axios.post(ORDER_URL, order)
        .then(response => response)
}

const updateOrder = (id, order) => {
    return axios.put(ORDER_URL + "/" + id, order)
        .then(response => response)
}

const deleteOrder = (id) => {
    return axios.delete(ORDER_URL + "/" + id)
        .then(response => response)
}

export default {
    getAllOrders,
    getOrder,
    getOrderByPage,
    createOrder,
    updateOrder,
    deleteOrder
}