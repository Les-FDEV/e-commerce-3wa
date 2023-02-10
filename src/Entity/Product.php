<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\PostImageController;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
    operations: [
        new Get,
        new GetCollection,
        new Post(
            uriTemplate: '/products',
            name: 'post',
        ),
        new Post(
            uriTemplate: '/products/{id}/image',
            controller: PostImageController::class,
            deserialize: false,
            name: 'post_image',
        ),
        new Put(
            uriTemplate: '/products/{id}/image',
            controller: PostImageController::class,
            deserialize: false,
            name: 'put_image',
        ),
        new Patch(),
        new Delete
    ],
    normalizationContext: ['groups' => ['product:read']],
    order: ['id' => 'DESC'],
    paginationItemsPerPage: 10,
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

    #[Vich\UploadableField(mapping: 'post_product_image', fileNameProperty: 'imageName')]
    private ?File $imageFile = null;

    #[ORM\Column(nullable: true)]
    private ?string $imageName = null;

    #[Groups(['product:read'])]
    private ?string $imagePath = null;

    /**
     * @return string|null
     */
    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    /**
     * @param string|null $imagePath
     */
    public function setImagePath(?string $imagePath): void
    {
        $this->imagePath = $imagePath;
    }

    #[ORM\Column(type: Types::DATETIME_MUTABLE,nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: CharacteristicProduct::class, orphanRemoval: true)]
    #[Groups(['product:read'])]
    private Collection $characteristicProducts;

    #[ORM\ManyToMany(targetEntity: Category::class, mappedBy: 'products')]
    #[Groups(['product:read'])]
    private Collection $categories;

    public function __construct()
    {
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

    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTime();
        }
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImageName(?string $imageName): void
    {
        $this->imageName = $imageName;
    }

    public function getImageName(): ?string
    {
        return $this->imageName;
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

    /**
     * @return \DateTime|null
     */
    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updatedAt;
    }

    /**
     * @param \DateTime|null $updatedAt
     */
    public function setUpdatedAt(?\DateTime $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }
}
