<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $hasher)
    {
    }

    public function load(ObjectManager $manager): void
    {

        $faker = Faker\Factory::create('fr_FR');

        for($i=0; $i < 10 ; $i++)
        {
            $user =new User();

            $user   ->setFirstname($faker->firstName())
                ->setLastname($faker->lastName())
                ->setEmail($faker->email())
                ->setPhoneNumber($faker->phoneNumber())
                ->setPassword($this->hasher->hashPassword($user, 'password'))
            ;

            $this->addReference('user' . $i, $user);

            $manager->persist($user);

        }

        $manager->flush();
    }
}
