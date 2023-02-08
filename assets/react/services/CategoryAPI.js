import axios from "axios";
import {CATEGORY_URL} from "../config/config";

const getAllCategories = () => {
    return axios.get(CATEGORY_URL)
        .then(response => response.data['hydra:member'])
}

const getCategory = (id) => {
    return axios.get(CATEGORY_URL + "/" + id)
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
        .catch(error => console.log(error));
}

export default {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
