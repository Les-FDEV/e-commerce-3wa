<?php

namespace App\Controller;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin', name: 'app_admin')]
class DashboardController extends AbstractController
{
    #[Route('/', name: '_index')]
    public function index(ProductRepository $productRepository): Response
    {
        return $this->render('dashboard/index.html.twig', [
            'products' => $productRepository->findAll(),
        ]);
    }
}
