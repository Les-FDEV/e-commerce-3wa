<?php

namespace App\Controller;

use App\Repository\CategoryRepository;
use App\Repository\CharacteristicRepository;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class ApiController extends AbstractController
{
    public function __construct(
        private readonly CategoryRepository $categoryRepository,
        private readonly CharacteristicRepository $characteristicRepository,
        private readonly ProductRepository $productRepository
    ){}
    #[Route('/categories', name: 'api_categories')]
    public function getCategories(): Response
    {
        $categories = $this->categoryRepository->findAll();
        $allCategories = [];
        foreach ($categories as $category){
            $allCategories[] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
                'description' => $category->getDescription()
            ];
        }

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent(json_encode($allCategories));
        return $response;
    }
    #[Route('/characteristics', name: 'api_characteristics')]
    public function getCharacteristics(): Response
    {
        $characteristics = $this->characteristicRepository->findAll();
        $allCharacteristics = [];
        foreach ($characteristics as $characteristic){
            $allCharacteristics[] = [
                'id' => $characteristic->getId(),
                'color' => $characteristic->getColor(),
                'weight' => $characteristic->getWeight(),
                'memory' => $characteristic->getMemory()
            ];
        }

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent(json_encode($allCharacteristics));
        return $response;
    }
    #[Route('/products', name: 'api_products')]
    public function getProducts(): Response
    {
        $products = $this->productRepository->findAll();
        $allProducts = [];
        $allCategories = [];
        $allCharacteristics = [];
        foreach ($products as $product){
            $categoriesProduct = $product->getCategoriesProducts();
            foreach ($categoriesProduct as $categoryProduct){
                $category = $categoryProduct->getCategory();
                $allCategories[] = $category->getId();
            }
            $characteristicsProduct = $product->getCharacteristicProducts();
            foreach ($characteristicsProduct as $characteristicProduct){
                $characteristic = $characteristicProduct->getCharacteristic();
                $allCharacteristics[] = $characteristic->getId();
            }
            $allProducts[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'categories' => $allCategories,
                'characteristics' => $allCharacteristics
            ];
        }

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent(json_encode($allProducts));
        return $response;
    }
}
