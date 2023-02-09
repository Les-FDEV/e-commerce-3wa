import React,{useState,useEffect}  from 'react'
import {getAllProductInCart, getDetailsProduct} from "../../request/orderRequest";

const Cart = () => {

    const [productsId,setProductsId]=useState([])

    useEffect(()=>{
        getAllProductInCart().then((res)=>{
            setProductsId(res)
        })
    },[])

    useEffect(()=>{
        getDetailsProduct(2)
    },[productsId])

    return (
        <div className="container my-2">
            {productsId.map((val,id)=>
                <div key={id} className=''>
                    {val.qte}
                </div>
            ) }
        </div>
    )
}

export default Cart