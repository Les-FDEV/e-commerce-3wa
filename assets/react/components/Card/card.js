import React, { useState, useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe("pk_test_51IbTqSKwIBcjbfsZothkCdbahP9Mr4zfmYooDds9UBedlRHP6OSEzSZLKkREOe5r769OHtBhKzHWY4T2r6SfhSoN00d1QRShpY");
const Card = ({ paymentIntent }) => {

    const [hasSecrestK, setHasSecrestK ] = useState(false)

    useEffect(()=>{

        setHasSecrestK(true)

    },[paymentIntent])


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        paymentIntent,
        appearance,
    };

    return (
        <div className="card-payment">
            {!hasSecrestK && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );


}

export default Card