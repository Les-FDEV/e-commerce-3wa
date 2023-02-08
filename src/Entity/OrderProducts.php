<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\OrderProductsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrderProductsRepository::class)]
#[ApiResource(
    operations: [
        new Get,
        new GetCollection(),
        new Post,
        new Put,
        new Delete
    ],
    //normalizationContext: ['groups' => ['address:output']],
    //denormalizationContext: ['groups' => ['address:input']],
)]
class OrderProducts
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['order:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['order:read'])]
    private ?string $product = null;

    #[ORM\Column]
    #[Groups(['order:read'])]
    private ?int $quantity = null;

    #[ORM\Column]
    #[Groups(['order:read'])]
    private ?int $total = null;

    #[ORM\ManyToOne(inversedBy: 'orderProducts')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Order $orderReference = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): ?string
    {
        return $this->product;
    }

    public function setProduct(?string $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getTotal(): ?int
    {
        return $this->total;
    }

    public function setTotal(int $total): self
    {
        $this->total = $total;

        return $this;
    }

    public function getOrderReference(): ?Order
    {
        return $this->orderReference;
    }

    public function setOrderReference(?Order $orderReference): self
    {
        $this->orderReference = $orderReference;

        return $this;
    }
}
