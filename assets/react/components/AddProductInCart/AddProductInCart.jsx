import React,{useState}  from 'react'
import {addProductInCart} from "../../request/orderRequest";


const AddProductInCart = ({productId}) => {

    const [qte,setQte]=useState(1)

    const handleClick= () =>{
        addProductInCart(productId,qte)
    }

    return (

        <div>
            <button className='btn btn-success btn-panier' onClick={handleClick} >Ajouter au panier</button>
        </div>

    )
}

export  default  AddProductInCart