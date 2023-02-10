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
        $WeightArrray = [
            "Moins de 500g",
            "Entre 500g et 1kg",
            "Entre 1kg et 2kg",
            "Entre 2kg et 3kg",
            "Plus de 3kg"
        ];

        $colorArray = [
            "Noir",
            "Blanc",
            "Gris",
            "Rouge",
            "Bleu",
            "Vert",
            "Jaune",
            "Rose",
            "Orange",
            "Violet",
            "Marron",
            "Beige",
            "Multicolore"
        ];
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 5; $i++) {
            $characteristic = new Characteristic;
            $characteristic->setName($faker->word)
                ->setType($faker->word)
                ->setValue($WeightArrray[$i]);
            $manager->persist($characteristic);
            $this->addReference('characteristic' . $i, $characteristic);
        }

        for ($i = 0; $i < 12; $i++) {
            $characteristic = new Characteristic;
            $characteristic->setName($faker->word)
                ->setType($faker->word)
                ->setValue($colorArray[$i]);
            $manager->persist($characteristic);
            $this->addReference('characteristic' . $i + 5, $characteristic);
        }

        $manager->flush();
    }
}
