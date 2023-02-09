import {CHARACTERISTICS_URL} from "../config/config";
import axios from "axios";

const getAllCharacteristics = () => {
    return axios.get(CHARACTERISTICS_URL)
        .then(response => response.data['hydra:member'])
}


const createCharacteristic = (characteristic) => {
    return axios.post(CHARACTERISTICS_URL, characteristic)
        .then(response => response)
}
export default {
    getAllCharacteristics,
    createCharacteristic
}