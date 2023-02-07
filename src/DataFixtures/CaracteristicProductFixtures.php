<?php

namespace App\DataFixtures;

use App\Entity\CaracteristicProduct;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker;

class CaracteristicProductFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for($i = 0; $i < 30; $i++){
            $carProduct = new CaracteristicProduct;
            $product = $this->getReference('product'.$i);
            for($j = 0; $j < $faker->numberBetween(0,4); $j++){
                $caracteristic = $this->getReference('caracteristic'.$faker->numberBetween(0, 29));
                $carProduct->addCaracteristic($caracteristic);
            }
            $carProduct->addProduct($product)
                ->setPrice($faker->randomFloat(1000))
                ->setStock($faker->numberBetween(0,100))
            ;
            $manager->persist($carProduct);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CaracteristicFixtures::class,
            CategoryFixtures::class,
            ProductFixtures::class,
            CategoryProductFixtures::class
        ];
    }
}
