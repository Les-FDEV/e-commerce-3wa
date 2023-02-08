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
use Doctrine\ORM\Mapping as ORM;

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
    //normalizationContext: ['groups' => ['address:output']],
    //denormalizationContext: ['groups' => ['address:input']],
)]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?\DateTime $created_at = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTime $confirmed_at = null;

    #[ORM\Column(length: 255)]
    private ?string $statut = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'orderReference', targetEntity: OrderProducts::class, orphanRemoval: true)]
    private Collection $orderProducts;

    #[ORM\OneToOne(mappedBy: 'orderReference', cascade: ['persist', 'remove'])]
    private ?Payment $payment = null;

    #[ORM\ManyToOne(inversedBy: 'orderReference')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Shipping $shipping = null;

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

    public function getPayment(): ?Payment
    {
        return $this->payment;
    }

    public function setPayment(Payment $payment): self
    {
        // set the owning side of the relation if necessary
        if ($payment->getOrderReference() !== $this) {
            $payment->setOrderReference($this);
        }

        $this->payment = $payment;

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
}
