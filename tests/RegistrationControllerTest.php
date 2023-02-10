<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class RegistrationControllerTest extends WebTestCase
{
    public function testSomething(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', 'http://localhost:8000/inscription');

        $buttonCrawlerNode = $crawler->selectButton("M'inscrire");
        $form = $buttonCrawlerNode->form();

        $form['registration_form[firstname]'] = 'Steve';

        $client->submit($form);

        $this->assertResponseIsSuccessful();
    }
}
