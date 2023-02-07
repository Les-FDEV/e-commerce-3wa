<?php

namespace App\DataFixtures;

use App\Entity\Caracteristic;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class CaracteristicFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for($i = 0; $i < 30; $i++){
            $caracteristic = new Caracteristic;
            $caracteristic->setColor($faker->colorName)
                ->setMemory($faker->numberBetween(16, 1024))
                ->setWeight($faker->randomFloat(10))
            ;
            $manager->persist($caracteristic);
            $this->addReference('caracteristic'.$i, $caracteristic);
        }

        $manager->flush();
    }
}
