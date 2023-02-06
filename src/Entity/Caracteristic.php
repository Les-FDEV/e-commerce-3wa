<?php

namespace App\Entity;

use App\Repository\CaracteristicRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CaracteristicRepository::class)]
class Caracteristic
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 63, nullable: true)]
    private ?string $color = null;

    #[ORM\Column(nullable: true)]
    private ?int $weight = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $memory = null;

    #[ORM\ManyToOne(inversedBy: 'caracteristic')]
    private ?CaracteristicProduct $caracteristicProduct = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getWeight(): ?int
    {
        return $this->weight;
    }

    public function setWeight(?int $weight): self
    {
        $this->weight = $weight;

        return $this;
    }

    public function getMemory(): ?string
    {
        return $this->memory;
    }

    public function setMemory(?string $memory): self
    {
        $this->memory = $memory;

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
