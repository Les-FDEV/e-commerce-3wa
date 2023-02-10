<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[isGranted('ROLE_USER')]
class CartController extends AbstractController
{
    #[Route('/cart', name: 'app_cart')]
    public function index()
    {

        return $this->render('cart/index.html.twig',[

        ]);
    }
}