<?php

namespace App\Service;

use Stripe\PaymentIntent;
use Stripe\Stripe;

class StripePaymentService
{

    public function __construct()
    {
        Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);
        Stripe::setApiVersion('2022-08-01');
    }

    public function paymentIntent($price)
    {
        $paymentIntent = PaymentIntent::create([
            'amount' => $price * 100,
            'currency' => 'EUR',
            'payment_method_types' => ['card']
        ]);

        return $paymentIntent->client_secret;
    }
}