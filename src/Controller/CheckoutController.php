<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class CheckoutController extends AbstractController
{

    #[Route('/checkout', name: 'app_checkout')]
    public function index()
    {

        return $this->render('checkout/index.html.twig',[

        ]);
    }
}