<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\CharacteristicRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CharacteristicRepository::class)]
#[ApiResource(
    operations: [
        new Get,
        new GetCollection,
        new Post,
        new Put,
        new Delete
    ],
    //normalizationContext: ['groups' => ['address:output']],
    //denormalizationContext: ['groups' => ['address:input']],
)]
class Characteristic
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 63, nullable: true)]
    #[Groups(['product:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 63, nullable: true)]
    #[Groups(['product:read'])]
    private ?string $value = null;

    #[ORM\Column(length: 63, nullable: true)]
    #[Groups(['product:read'])]
    private ?string $type = null;

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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(?string $value): self
    {
        $this->value = $value;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

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
