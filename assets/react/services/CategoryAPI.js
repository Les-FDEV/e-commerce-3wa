import axios from "axios";
import {API_URL, CATEGORY_URL} from "../config/config";

const getAllCategories = () => {
    return axios.get(CATEGORY_URL)
        .then(response => response.data)
}

const getCategory = (id) => {
    return axios.get(CATEGORY_URL + "/" + id)
        .then(response => response.data)
}
const getCategoryByPage = (page) => {
    return axios.get(API_URL + page)
        .then(response => response.data)
}
const createCategory = (category) => {
    return axios.post(CATEGORY_URL, category)
        .then(response => response)
}

const updateCategory = (id, category) => {
    return axios.put(CATEGORY_URL + "/" + id, category)
        .then(response => response)
}

const deleteCategory = (id) => {
    return axios.delete(CATEGORY_URL + "/" + id)
        .then(response => response)
}

export default {
    getAllCategories,
    getCategory,
    getCategoryByPage,
    createCategory,
    updateCategory,
    deleteCategory
}
