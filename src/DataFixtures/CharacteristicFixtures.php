<?php

namespace App\DataFixtures;

use App\Entity\Characteristic;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class CharacteristicFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 30; $i++) {
            $characteristic = new Characteristic;
            $characteristic->setName($faker->word)
                ->setType($faker->word)
                ->setValue($faker->word);
            $manager->persist($characteristic);
            $this->addReference('characteristic' . $i, $characteristic);
        }

        $manager->flush();
    }
}
