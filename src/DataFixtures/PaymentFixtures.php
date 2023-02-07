<?php

namespace App\DataFixtures;

use App\Entity\Payment;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class PaymentFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($p = 0; $p < 10; $p++) {
            $payment = new Payment();
            $payment->setOrderReference($this->getReference('order' . $p))
                ->setMethod($faker->creditCardType())
                ->setTerm($faker->words(3, true));
            $manager->persist($payment);
        }

        $manager->flush();
    }
}
