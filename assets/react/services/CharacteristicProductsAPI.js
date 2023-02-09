import axios from "axios";
import {CHARACTERISTIC_PRODUCTS_URL} from "../config/config";

const getAllCharacteristicProducts = () => {
    return axios.get(CHARACTERISTIC_PRODUCTS_URL)
        .then(response => response.data['hydra:member'])
        .catch(error => console.log(error.response))
}

const createCharacteristicProduct = (characteristicProduct) => {
    return axios.post(CHARACTERISTIC_PRODUCTS_URL, characteristicProduct)
        .then(response => response)
}

export default {
    getAllCharacteristicProducts,
    createCharacteristicProduct
}