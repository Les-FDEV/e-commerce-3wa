import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm( props ) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);


        await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:8000",
            },
            redirect: "if_required",
        }).then(async (res)=>{


            const { error , paymentIntent } = res


            if(paymentIntent){

                const orderForm = document.querySelector('#_orderInformations')

                orderForm.submit()

            }


            if(error){

                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message);
                } else {
                    setMessage("An unexpected error occurred.");
                }

                setIsLoading(false);
            }

        })

    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <div className="d-grid gap-2">
                <button className="btn btn-primary" disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? (
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : "Payer"}
                    </span>
                </button>
            </div>
            {/* Show any error or success messages */}
            {message && <div  className="alert alert-danger" role="alert" id="payment-message">{message}</div>}
        </form>
    );
}