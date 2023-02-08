<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
    operations: [
        new Get,
        new GetCollection,
        new Post,
        new Put,
        new Delete
    ],
    normalizationContext: ['groups' => ['product:read']],
    //denormalizationContext: ['groups' => ['address:input']],
)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read', 'order:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 127)]
    #[Groups(['product:read', 'order:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['product:read', 'order:read'])]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: CharacteristicProduct::class)]
    #[Groups(['product:read'])]
    private Collection $characteristicProducts;

    #[ORM\ManyToMany(targetEntity: Category::class, mappedBy: 'products')]
    #[Groups(['product:read'])]
    private Collection $categories;

    public function __construct()
    {
        $this->categoriesProduct = new ArrayCollection();
        $this->characteristicProducts = new ArrayCollection();
        $this->categories = new ArrayCollection();
    }
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
            $characteristicProduct->setProduct($this);
        }

        return $this;
    }

    public function removeCharacteristicProduct(CharacteristicProduct $characteristicProduct): self
    {
        if ($this->characteristicProducts->removeElement($characteristicProduct)) {
            // set the owning side to null (unless already changed)
            if ($characteristicProduct->getProduct() === $this) {
                $characteristicProduct->setProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, CategoriesProduct>
     */
    public function getCategoriesProducts(): Collection
    {
        return $this->categoriesProduct;
    }

    public function addCategoryProduct(CategoriesProduct $categoryProduct): self
    {
        if (!$this->categoriesProduct->contains($categoryProduct)) {
            $this->categoriesProduct->add($categoryProduct);
            $categoryProduct->setProduct($this);
        }

        return $this;
    }

    public function removeCategoryProduct(CategoriesProduct $categoryProduct): self
    {
        if ($this->categoriesProduct->removeElement($categoryProduct)) {
            // set the owning side to null (unless already changed)
            if ($categoryProduct->getProduct() === $this) {
                $categoryProduct->setProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
            $category->addProduct($this);
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        if ($this->categories->removeElement($category)) {
            $category->removeProduct($this);
        }

        return $this;
    }
}
