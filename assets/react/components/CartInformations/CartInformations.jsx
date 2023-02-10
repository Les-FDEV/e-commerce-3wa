import React, {useState,useEffect} from "react";
import {getAllProductInCart} from "../../request/orderRequest";
import axios from "axios";
import {PRODUCT_URL} from "../../config/config";

const CartInformations = () =>{

    const [productsId,setProductsId]=useState([])
    const [productLoading,setProductLoading]=useState(false)
    const [products,setProducts]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)


    useEffect(()=>{
        getAllProductInCart().then((res)=>{
            setProductsId(res)
            setProductLoading(true)
        })
    },[])

    useEffect(()=>{
        setOrderInformations()

        for (const d of productsId) {
            axios.get(PRODUCT_URL + "/" + d.id)
                .then((response) =>{

                    const data = response.data

                    const productData={
                        id: data.id,
                        image:null,
                        name: data.name,
                        price: Number( data.characteristicProducts[0].price),
                        qte : Number(d.qte)
                    }

                    setProducts(r => [...r, productData])
                })
        }

    },[productLoading])

    useEffect(()=>{

        let res = 0
        for(const p of products)
        {
            res += Number((p.price * p.qte).toFixed(2))
        }

        setTotalPrice(res)

    },[products])


    const setOrderInformations = () =>{
        const orderProductInformations = document.querySelector('#_orderProductInformations')
        orderProductInformations.value=JSON.stringify(productsId)
        console.log(orderProductInformations)
    }


    return (
        <>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Panier</span>
                <span className="badge bg-primary rounded-pill">{ products.length }</span>
            </h4>

            <ul className="list-group mb-3">
                { products && products.map((val,i)=>

                    <li key={i} className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 className="my-0"> <strong >{val.qte}</strong> x {val.name}</h6>
                        </div>
                        <span className="text-muted">{val.price} €</span>
                    </li>
                )
                }

                <li className="list-group-item d-flex justify-content-between">
                    <span>Prix Total </span>
                    <strong>{ totalPrice }</strong>
                </li>
            </ul>

        </>
    )
}

export  default CartInformations