<?php

namespace App\DataFixtures;

use App\Entity\OrderProducts;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class OrderProductsFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

       for ($op = 0; $op < 20; $op++) {
            $orderProduct = new OrderProducts();
            $orderProduct->setProduct('product'.$op)
                ->setQuantity($faker->numberBetween(1, 3))
                ->setTotal($faker->numberBetween(1, 150))
                ->setOrderReference($this->getReference('order' . $op));
            $manager->persist($orderProduct);
        }

        $manager->flush();
    }
}
