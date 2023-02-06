<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 127)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'product')]
    private ?CategoriesProduct $categoriesProduct = null;

    #[ORM\ManyToOne(inversedBy: 'product')]
    private ?CaracteristicProduct $caracteristicProduct = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCategoriesProduct(): ?CategoriesProduct
    {
        return $this->categoriesProduct;
    }

    public function setCategoriesProduct(?CategoriesProduct $categoriesProduct): self
    {
        $this->categoriesProduct = $categoriesProduct;

        return $this;
    }

    public function getCaracteristicProduct(): ?CaracteristicProduct
    {
        return $this->caracteristicProduct;
    }

    public function setCaracteristicProduct(?CaracteristicProduct $caracteristicProduct): self
    {
        $this->caracteristicProduct = $caracteristicProduct;

        return $this;
    }
}