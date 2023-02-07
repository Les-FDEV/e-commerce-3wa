import React  from 'react'
import Card from "../components/Card/card";
const  payment= (props) =>{

    return(
        <>
            <Card paymentIntent={ props.paymentIntent } />
        </>
    )
}

export default payment