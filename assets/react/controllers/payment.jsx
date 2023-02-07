import React  from 'react'
import Card from "../components/Card/card";
const  payment= (props) =>{

    return(
        <div>

            <Card paymentIntent={ props.paymentIntent } />
        </div>
    )
}

export default payment