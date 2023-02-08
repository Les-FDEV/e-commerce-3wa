<?php

namespace App\Controller;

use App\Repository\CategoryRepository;
use App\Repository\CharacteristicRepository;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api2')]
class ApiController extends AbstractController
{
    public function __construct(
        private readonly CategoryRepository $categoryRepository,
        private readonly CharacteristicRepository $characteristicRepository,
        private readonly ProductRepository $productRepository,
        private readonly UserRepository $userRepository
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
        foreach ($products as $product){
            $categoriesProduct = $product->getCategoriesProducts();
            $allCategories = [];
            foreach ($categoriesProduct as $categoryProduct){
                $category = $categoryProduct->getCategory();
                $allCategories[] = [
                    'name' => $category->getName(),
                    'id' => $category->getId()
                ];
            }
            $characteristicsProduct = $product->getCharacteristicProducts();
            $allCharacteristics = [];
            foreach ($characteristicsProduct as $characteristicProduct){
                $characteristic = $characteristicProduct->getCharacteristic();
                $allCharacteristics[] = [
                    'id' => $characteristic->getId(),
                    'price' => $characteristicProduct->getPrice(),
                    'stock' => $characteristicProduct->getStock()
                ];
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
    #[Route('/product/add', name: 'api_product_add')]
    public function addProduct(): Response
    {
        $products = $this->productRepository->findAll();
        $allProducts = [];
        foreach ($products as $product){
            $categoriesProduct = $product->getCategoriesProducts();
            $allCategories = [];
            foreach ($categoriesProduct as $categoryProduct){
                $category = $categoryProduct->getCategory();
                $allCategories[] = [
                    'name' => $category->getName(),
                    'id' => $category->getId()
                ];
            }
            $characteristicsProduct = $product->getCharacteristicProducts();
            $allCharacteristics = [];
            foreach ($characteristicsProduct as $characteristicProduct){
                $characteristic = $characteristicProduct->getCharacteristic();
                $allCharacteristics[] = [
                    'id' => $characteristic->getId(),
                    'price' => $characteristicProduct->getPrice(),
                    'stock' => $characteristicProduct->getStock()
                ];
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
    #[Route('/users', name: 'api_users')]
    public function getUsers(): Response
    {
        $users = $this->userRepository->findAll();
        $allUsers = [];
        foreach ($users as $user){
            $allAddresses = [];
            $addresses = $user->getAddresses();
            foreach ($addresses as $address){
                $allAddresses[] = [
                    'id' => $address->getId(),
                    'country' => $address->getCountry(),
                    'city' => $address->getCity(),
                    'number' => $address->getNumber(),
                    'street' => $address->getStreet(),
                    'type' => $address->getType()
                ];
            }
            $allUsers[] = [
                'id' => $user->getId(),
                'firstName' => $user->getFirstname(),
                'lastName' => $user->getLastname(),
                'email' => $user->getEmail(),
                'userIdentifier' => $user->getUserIdentifier(),
                'password' => $user->getPassword(),
                'phone' => $user->getPhoneNumber(),
                'roles' => $user->getRoles(),
                'addresses' => $allAddresses
            ];
        }

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent(json_encode($allUsers));
        return $response;
    }
}
