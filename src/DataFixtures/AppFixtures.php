<?php

namespace App\DataFixtures;

use App\Entity\Rapport;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Création d'une vingtaine de livres ayant pour titre
        for ($i = 0; $i < 30; $i++) {
            $rapport = new Rapport;
            $rapport->setInstallation(random_int(1, 10));
            $rapport->setInterqualite(random_int(0, 5));
            $rapport->setInterdepannage(random_int(1, 7));
            $rapport->setVisite(random_int(0, 4));
            $rapport->setRecuperation(random_int(0, 6));
            $rapport->setAutre('Autre information ' . $i);
            $manager->persist($rapport);
        }

        $manager->flush();
    }
}
