<?php

namespace App\DataFixtures;

use App\Entity\Address;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker;

class AddressFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for($i=0; $i < 10 ; $i++)
        {
            $address=new Address();

            $address    ->setUser($this->getReference('user'.$i))
                        ->setType('home')
                        ->setNumber($faker->buildingNumber())
                        ->setStreet($faker->streetName())
                        ->setCity($faker->city())
                        ->setCountry($faker->country())
            ;

            $manager->persist($address);
        }


        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
        ];
    }
}
