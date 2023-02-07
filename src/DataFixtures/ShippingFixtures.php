<?php

namespace App\DataFixtures;

use App\Entity\Shipping;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class ShippingFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($s = 0; $s < 8; $s++) {
            $shipping = new Shipping();
            $shipping->addOrderReference($this->getReference('order' . $s))
                ->setMethod('method' . $s)
                ->setCost($faker->randomFloat(2, 0, 20))
                ->setStatus('status' . $s);

            $manager->persist($shipping);
        }

        $manager->flush();
    }
}
