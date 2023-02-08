import axios from "axios";
import {CATEGORY_URL} from "../config/config";

const getAllCategories = () => {
    return axios.get(CATEGORY_URL)
        .then(response => response.data['hydra:member'])
        .catch(error => console.log(error));
}

const getCategory = (id) => {
    return axios.get(CATEGORY_URL + "/" + id)
        .then(response => response.data)
        .catch(error => console.log(error));
}

const createCategory = (category) => {
    return axios.post(CATEGORY_URL, category)
        .then(response => response.data)
        .catch(error => console.log(error));
}

const updateCategory = (id, category) => {
    return axios.put(CATEGORY_URL + "/" + id, category)
        .then(response => response.data)
        .catch(error => console.log(error));
}

const deleteCategory = (id) => {
    return axios.delete(CATEGORY_URL + "/" + id)
        .then(response => response.data)
        .catch(error => console.log(error));
}

export default {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
