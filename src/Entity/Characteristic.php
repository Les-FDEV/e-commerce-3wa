<?php

namespace App\Entity;

use App\Repository\CharacteristicRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CharacteristicRepository::class)]
class Characteristic
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 63, nullable: true)]
    private ?string $color = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2, nullable: true)]
    private ?string $weight = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2, nullable: true)]
    private ?string $memory = null;

    #[ORM\OneToMany(mappedBy: 'characteristic', targetEntity: CharacteristicProduct::class)]
    private Collection $characteristicProducts;

    public function __construct()
    {
        $this->characteristicProducts = new ArrayCollection();
    }

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

    public function getWeight(): ?string
    {
        return $this->weight;
    }

    public function setWeight(?string $weight): self
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

    /**
     * @return Collection<int, CharacteristicProduct>
     */
    public function getCharacteristicProducts(): Collection
    {
        return $this->characteristicProducts;
    }

    public function addCharacteristicProduct(CharacteristicProduct $characteristicProduct): self
    {
        if (!$this->characteristicProducts->contains($characteristicProduct)) {
            $this->characteristicProducts->add($characteristicProduct);
            $characteristicProduct->setCharacteristic($this);
        }

        return $this;
    }

    public function removeCharacteristicProduct(CharacteristicProduct $characteristicProduct): self
    {
        if ($this->characteristicProducts->removeElement($characteristicProduct)) {
            // set the owning side to null (unless already changed)
            if ($characteristicProduct->getCharacteristic() === $this) {
                $characteristicProduct->setCharacteristic(null);
            }
        }

        return $this;
    }
}