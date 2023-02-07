<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/product', name: 'app_admin_product_')]
class ProductCrudController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(): Response
    {
        return $this->render('product_crud/index.html.twig');
    }

    #[Route('/nouveau', name: 'new')]
    public function new(): Response
    {
        return $this->render('product_crud/new.html.twig');
    }
}
