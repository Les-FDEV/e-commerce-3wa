import React,{useState,useEffect}  from 'react'
import {
    deleteProductInCart,
    getAllProductInCart,
    getDetailsProduct,
    getDetailsProducts,
    resetCart
} from "../../request/orderRequest";
import axios from "axios";
import {PRODUCT_URL} from "../../config/config";

const Cart = () => {

    const [productsId,setProductsId]=useState([])
    const [productLoading,setProductLoading]=useState(false)
    const [products,setProducts]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)
    const [allProductLoad,setAllProductLoad]=useState(false)

    useEffect(()=>{
        getAllProductInCart().then((res)=>{
            setProductsId(res)
            setProductLoading(true)
        })
    },[])

    useEffect(()=>{

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


    const handleChange = () =>{

    }
    const handleClick = (id) =>{
        setProductsId(productsId.filter((val) => val.id !== id))
        setProducts(products.filter((val) => val.id !== id))
        deleteProductInCart(id)
    }

    const order = () =>{
        const priceForm = document.querySelector('#cart_form_price')
        const priceInput = document.querySelector('#order_price_input')
        priceInput.value=totalPrice

        priceForm.submit()
    }

    return (
        <div className="container my-2">

            <div className="row">
                <div className="col-8">

                    { productsId.length > 0 &&

                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">Produit</th>
                            <th scope="col">Prix</th>
                            <th scope="col">Qte</th>
                            <th scope="col">Total</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>

                        {   products && products.map((val,i)=>
                            <tr key={i}>
                                <th scope="row">
                                    <img src={ val.image } className="img-fluid" alt="..." />
                                </th>
                                <td>{val.name}</td>
                                <td>{val.price}</td>
                                <td>
                                    {val.qte}
                                    {/*<input type="number" id={'product' + val.id} value={val.qte} className="form-control text-center" min="1" onChange={handleChange} />*/}
                                </td>
                                <td>
                                    { (val.price * val.qte).toFixed(2) } €
                                </td>
                                <td>
                                    <button onClick={()=>handleClick(val.id)} type="button" className="btn btn-danger btn-sm">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    }

                    { productsId.length == 0 &&
                        <div className="container">
                            <div className="alert alert-warning" role="alert">
                                Il n'y a plus d'articles dans votre panier
                            </div>

                        </div>
                    }

                </div>
                <div className="col-4">

                    <div className="card">
                        <div className="card-body">

                            <div className="row my-2">
                                <div className="col-8">
                                    { products.length } article{products.length > 1 ? 's':''}
                                </div>
                                <div className='col-4 text-end'>{totalPrice.toFixed(2)} €</div>
                            </div>

                            <hr />
                            <div className="d-grid gap-2">
                                <button className="btn btn-secondary btn-sm" onClick={order} disabled={products.length < 1}>
                                    passer commande
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Cart