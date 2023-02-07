<?php

namespace App\DataFixtures;

use App\Entity\CategoriesProduct;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker;

class CategoryProductFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for($i = 0; $i < 30; $i++){
            $categoryProduct = new CategoriesProduct;
            $product = $this->getReference('product'.$i);
            for($j = 0; $j < $faker->numberBetween(1,4); $j++){
                $category = $this->getReference('category'.$faker->numberBetween(0,9));
                $categoryProduct->setCategory($category);
                $categoryProduct->setProduct($product);
                $manager->persist($categoryProduct);
            }
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CharacteristicFixtures::class,
            CategoryFixtures::class,
            ProductFixtures::class,
            CharacteristicProductFixtures::class
        ];
    }
}
