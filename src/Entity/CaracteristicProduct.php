<?php

namespace App\Entity;

use App\Repository\CaracteristicProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CaracteristicProductRepository::class)]
class CaracteristicProduct
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToMany(mappedBy: 'caracteristicProduct', targetEntity: Product::class)]
    private Collection $product;

    #[ORM\OneToMany(mappedBy: 'caracteristicProduct', targetEntity: Caracteristic::class)]
    private Collection $caracteristic;

    #[ORM\Column]
    private ?int $stock = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 6, scale: 2)]
    private ?string $price = null;

    public function __construct()
    {
        $this->product = new ArrayCollection();
        $this->caracteristic = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProduct(): Collection
    {
        return $this->product;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->product->contains($product)) {
            $this->product->add($product);
            $product->setCaracteristicProduct($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->product->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getCaracteristicProduct() === $this) {
                $product->setCaracteristicProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Caracteristic>
     */
    public function getCaracteristic(): Collection
    {
        return $this->caracteristic;
    }

    public function addCaracteristic(Caracteristic $caracteristic): self
    {
        if (!$this->caracteristic->contains($caracteristic)) {
            $this->caracteristic->add($caracteristic);
            $caracteristic->setCaracteristicProduct($this);
        }

        return $this;
    }

    public function removeCaracteristic(Caracteristic $caracteristic): self
    {
        if ($this->caracteristic->removeElement($caracteristic)) {
            // set the owning side to null (unless already changed)
            if ($caracteristic->getCaracteristicProduct() === $this) {
                $caracteristic->setCaracteristicProduct(null);
            }
        }

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): self
    {
        $this->price = $price;

        return $this;
    }
}
