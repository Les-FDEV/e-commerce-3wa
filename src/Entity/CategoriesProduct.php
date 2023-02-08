<?php

namespace App\Entity;

use App\Repository\CategoriesProductRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoriesProductRepository::class)]
class CategoriesProduct
{
//    #[ORM\Id]
//    #[ORM\GeneratedValue]
//    #[ORM\Column]
//    #[Groups(['product:read'])]
//    private ?int $id = null;
//
//    #[ORM\ManyToOne(inversedBy: 'categoriesProduct')]
//    #[Groups(['product:read'])]
//    private ?Product $product = null;
//
//    #[ORM\ManyToOne(inversedBy: 'categoriesProduct')]
//    #[Groups(['product:read'])]
//    private ?Category $category = null;
//
//    public function getId(): ?int
//    {
//        return $this->id;
//    }
//
//    public function getProduct(): ?Product
//    {
//        return $this->product;
//    }
//
//    public function setProduct(?Product $product): self
//    {
//        $this->product = $product;
//
//        return $this;
//    }
//
//    public function getCategory(): Category
//    {
//        return $this->category;
//    }
//
//    public function setCategory(?Category $category): self
//    {
//        $this->category = $category;
//
//        return $this;
//    }
}
