<?php

namespace App\Controller;

use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(ProductRepository $productRepository, CategoryRepository $categoryRepository): Response
    {
        $products = $productRepository->findBy(array(),array('id' => 'DESC'),5 );
        $id = rand(530,1600);
        $productsRand = $productRepository->find($id);
        if ($productsRand == null){
            $productsRand = $productRepository->find(515);
        }

        $categs = $categoryRepository->findAll();


        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'product' => $products,
            'productsRand' => $productsRand,
            'categs' => $categs
        ]);
    }
    #[Route('/product/{id}', name: 'oneProduct')]
    public function productSheet($id,ProductRepository $productRepository, CategoryRepository $categoryRepository): Response
    {
        $categs = $categoryRepository->findAll();
        return $this->render('productSheet/index.html.twig', [
            'controller_name' => 'HomeController',
            'oneProduct' =>  $productRepository->find($id),
            'categs' => $categs
        ]);
    }
}
