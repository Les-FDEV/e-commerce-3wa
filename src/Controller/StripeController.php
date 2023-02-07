<?php

namespace App\Controller;

use App\Service\StripePaymentService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class StripeController extends AbstractController
{

    #[Route('/stripe', name: 'paiment.key')]
    public function index(StripePaymentService $paymentService)
    {

        $key = $paymentService->paymentIntent(8);


        return $this->render('Stripe/index.html.twig',[
            'key'=> $key,
        ]);
    }
}