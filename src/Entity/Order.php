<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\OrderRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
#[ApiResource(
    operations: [
        new Get,
        new GetCollection,
        new Post,
        new Put,
        new Delete
    ],
    normalizationContext: ['groups' => ['order:read']],
    paginationItemsPerPage: 20,
)]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['order:read', 'address:read', 'user:read'])]
    private ?int $id = null;

    #[Groups(['order:read', 'address:read', 'user:read'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTime $created_at = null;

    #[Groups(['order:read', 'address:read', 'user:read'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTime $confirmed_at = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['order:read', 'address:read', 'user:read'])]
    private ?string $statut = null;

    #[ORM\ManyToOne(cascade: ['persist', 'remove'], inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['order:read'])]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'orderReference', targetEntity: OrderProducts::class, orphanRemoval: true)]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['order:read', 'address:read', 'user:read'])]
    private Collection $orderProducts;


    #[ORM\ManyToOne(inversedBy: 'orderReference')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['order:read', 'address:read', 'user:read'])]
    private ?Shipping $shipping = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    #[Groups(['order:read', 'address:read', 'user:read'])]
    private ?string $total = null;

    #[ORM\OneToOne(inversedBy: 'orderReference', cascade: ['persist', 'remove'])]
    private ?Payment $payment = null;

    public function __construct()
    {
        $this->orderProducts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?DateTime
    {
        return $this->created_at;
    }

    public function setCreatedAt(DateTime $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getConfirmedAt(): ?DateTime
    {
        return $this->confirmed_at;
    }

    public function setConfirmedAt(DateTime $confirmed_at): self
    {
        $this->confirmed_at = $confirmed_at;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): self
    {
        $this->statut = $statut;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, OrderProducts>
     */
    public function getOrderProducts(): Collection
    {
        return $this->orderProducts;
    }

    public function addOrderProduct(OrderProducts $orderProduct): self
    {
        if (!$this->orderProducts->contains($orderProduct)) {
            $this->orderProducts->add($orderProduct);
            $orderProduct->setOrderReference($this);
        }

        return $this;
    }

    public function removeOrderProduct(OrderProducts $orderProduct): self
    {
        if ($this->orderProducts->removeElement($orderProduct)) {
            // set the owning side to null (unless already changed)
            if ($orderProduct->getOrderReference() === $this) {
                $orderProduct->setOrderReference(null);
            }
        }

        return $this;
    }


    public function getShipping(): ?Shipping
    {
        return $this->shipping;
    }

    public function setShipping(?Shipping $shipping): self
    {
        $this->shipping = $shipping;

        return $this;
    }

    public function getTotal(): ?string
    {
        return $this->total;
    }

    public function setTotal(?string $total): self
    {
        $this->total = $total;

        return $this;
    }

    public function getPayment(): ?Payment
    {
        return $this->payment;
    }

    public function setPayment(?Payment $payment): self
    {
        $this->payment = $payment;

        return $this;
    }
}
