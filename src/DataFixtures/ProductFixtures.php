<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 30; $i++) {
            $product = new Product;
            $product->setName($faker->name)
                ->setDescription($faker->paragraph);
            for ($j = 0; $j < rand(0, 3); $j++) {
                $category = $this->getReference('category' . $faker->numberBetween(0, 9));
                $product->addCategory($category);
            };
            $manager->persist($product);

            $this->addReference('product' . $i, $product);
        }
        $manager->flush();
    }
}
