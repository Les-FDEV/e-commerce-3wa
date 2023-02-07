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

        for($i = 0; $i < 30; $i++){
            $product = new Product;
            $product->setName($faker->name)
                ->setDescription($faker->paragraph)
            ;
            $manager->persist($product);
            $this->addReference('product'.$i, $product);
        }
        $manager->flush();
    }
}
