<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $categoriesArray = [
            'Téléphones',
            'Ordinateurs',
            'Jeux vidéos',
            'Télévisions',
            'Appareils photos',
            'Enceintes',
            'Casques audio',
            'Imprimantes',
            'Accessoires',
            'Autres'
        ];
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 10; $i++) {
            $category = new Category;
            $category->setName($categoriesArray[$i])
                ->setDescription($faker->paragraph);
            $manager->persist($category);
            $this->addReference('category' . $i, $category);
        }

        $manager->flush();
    }
}
