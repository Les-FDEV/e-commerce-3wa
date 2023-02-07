import React, { useState, useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe("pk_test_51IbTqSKwIBcjbfsZothkCdbahP9Mr4zfmYooDds9UBedlRHP6OSEzSZLKkREOe5r769OHtBhKzHWY4T2r6SfhSoN00d1QRShpY");
const Card = ({ paymentIntent }) => {

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret: paymentIntent,
        appearance,
    };

    return (
        <div className="card-payment">
            {paymentIntent && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm  />
                </Elements>
            )}
        </div>
    );


}

export default Card