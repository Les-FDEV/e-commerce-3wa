<?php


namespace App\Controller;

use App\Entity\Product;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class PostImageController
{
    public function __invoke(Request $request): Product
    {


        $product = $request->attributes->get('data');

        if (!($product instanceof Product)) {
            throw new \RuntimeException('Product not found');
        }

        $file = $request->files->get('file');

        $product->setImageFile($file);
        $product->setUpdatedAt(new \DateTime());
        return $product;
    }
}