<?php

namespace App\DataFixtures;

use App\Entity\CharacteristicProduct;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker;

class CharacteristicProductFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for($i = 0; $i < 30; $i++){
            $carProduct = new CharacteristicProduct;
            $product = $this->getReference('product'.$i);
            for($j = 0; $j < $faker->numberBetween(1,5); $j++){
                $caracteristic = $this->getReference('characteristic'.$faker->numberBetween(0, 29));
                $carProduct->setCharacteristic($caracteristic);
                $carProduct->setProduct($product)
                    ->setPrice($faker->randomFloat(4))
                    ->setStock($faker->numberBetween(0,50))
                ;
                $manager->persist($carProduct);
            }
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            ProductFixtures::class,
            CharacteristicFixtures::class
        ];
        // TODO: Implement getDependencies() method.
    }
}
