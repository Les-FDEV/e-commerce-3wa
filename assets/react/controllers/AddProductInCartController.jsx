import React  from 'react'
import AddProductInCart from "../components/AddProductInCart/AddProductInCart";


const AddProductInCartController = ( props ) =>{

    return (
        <div>
            <AddProductInCart productId={props.id} />
        </div>
    )
}
export default AddProductInCartController