import axios from "axios";
import {PRODUCT_URL} from "../config/config.js";

const getAllProducts = () => {
    return axios.get(PRODUCT_URL)
        .then(response => response.data)
        .catch(error => error);
}

export default {
    getAllProducts
}