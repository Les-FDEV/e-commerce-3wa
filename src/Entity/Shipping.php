<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ShippingRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ShippingRepository::class)]
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
class Shipping
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['order:read'])]
    private ?int $id = null;

    #[ORM\OneToMany(mappedBy: 'shipping', targetEntity: Order::class)]
    private Collection $orderReference;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['order:read'])]
    private ?string $method = null;

    #[ORM\Column(length: 255)]
    #[Groups(['order:read'])]
    private ?string $status = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2)]
    #[Groups(['order:read'])]
    private ?string $cost = null;

    public function __construct()
    {
        $this->orderReference = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrderReference(): Collection
    {
        return $this->orderReference;
    }

    public function addOrderReference(Order $orderReference): self
    {
        if (!$this->orderReference->contains($orderReference)) {
            $this->orderReference->add($orderReference);
            $orderReference->setShipping($this);
        }

        return $this;
    }

    public function removeOrderReference(Order $orderReference): self
    {
        if ($this->orderReference->removeElement($orderReference)) {
            // set the owning side to null (unless already changed)
            if ($orderReference->getShipping() === $this) {
                $orderReference->setShipping(null);
            }
        }

        return $this;
    }

    public function getMethod(): ?string
    {
        return $this->method;
    }

    public function setMethod(string $method): self
    {
        $this->method = $method;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCost(): ?string
    {
        return $this->cost;
    }

    public function setCost(string $cost): self
    {
        $this->cost = $cost;

        return $this;
    }
}
