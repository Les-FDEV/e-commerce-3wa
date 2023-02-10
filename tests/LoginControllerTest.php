<?php

namespace App\Tests;

use App\Repository\UserRepository;
use Exception;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class LoginControllerTest extends WebTestCase
{
    /**
     * @throws Exception
     */
    public function testSomething(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);

        $testUser = $userRepository->findOneByEmail('testuser@gmail.com');

        $client->loginUser($testUser);

        $client->request('GET', "http://localhost:8000");
        $client->clickLink("S'enregistrer");
        $this->assertResponseIsSuccessful();
        //$this->assertSelectorTextContains('h1', 'Hello John!');
    }
}
