import Dexie from "dexie"
import axios from "axios";
import {PRODUCT_URL} from "../config/config.js";


const db = new Dexie("ProductDatabase")

db.version(1).stores({
    product: "id,qte"
})
export const getAllProductInCart = async () => {

    let res=[]

    await db.table('product').each((value,i)=>{
        res.push(value)
    })

    return res
}
export const getNbProductInCart = () => {

    return db.table('product').count()
}
export const addProductInCart = (id,qte) => {

    db.table('product').get(id).then((res) =>{

        if(res){
            db.table('product').update(id,{qte: res.qte + qte })
        }
        else {

            const obj={
                id,
                qte
            }

            db.table('product').add(obj)
        }

    })
}
export const deleteProductInCart = (id) => {

    db.table('product').delete(id)
}

export const getDetailsProduct = (id) => {

}

