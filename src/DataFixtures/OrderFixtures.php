<?php

namespace App\DataFixtures;

use App\Entity\Order;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class OrderFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        $status = ['en cours','payé', 'envoyé', 'livré'];
        for ($o = 0; $o < 20; $o++) {
            $order = new Order();
            $order
                ->setTotal($faker->randomFloat(2, 0, 1000))
                ->setCreatedAt($faker->dateTimeBetween('-1 years', '1 years'))
                ->setConfirmedAt($faker->dateTimeBetween('-1 years', '1 years'))
                ->setUser($this->getReference('user' . $faker->numberBetween(0, 9)))
                ->setStatut($status[$faker->numberBetween(0, 3)]);
            ;
            $this->addReference('order' . $o, $order);

            $manager->persist($order);


        }

        $manager->flush();
    }
}
