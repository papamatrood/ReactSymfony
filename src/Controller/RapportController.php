<?php

namespace App\Controller;

use App\Entity\Rapport;
use App\Repository\RapportRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RapportController extends AbstractController
{
    #[Route('/rapport', name: 'app_rapport')]
    public function index(): Response
    {
        return $this->render('rapport/index.html.twig', [
            'controller_name' => 'RapportController',
        ]);
    }

    #[Route('/api/rapports', name: 'rapports', methods: ['GET'])]
    public function getRapportList(RapportRepository $rapportRepository, SerializerInterface $serializer): JsonResponse
    {
        $rapportList = array_reverse($rapportRepository->findAll());
        $jsonRapportList = $serializer->serialize($rapportList, 'json');
        return new JsonResponse($jsonRapportList, Response::HTTP_OK, [], true);
    }

    #[Route('/api/addRapport', name: "createRapport", methods: ['POST'])]
    public function createRapport(Request $request, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse
    {
        $rapport = $serializer->deserialize($request->getContent(), Rapport::class, 'json');

        // Récupération de l'ensemble des données envoyées sous forme de tableau
        //$content = $request->toArray();

        // Récupération de l'idAuthor. S'il n'est pas défini, alors on met -1 par défaut.
        // $idAuthor = $content['idAuthor'] ?? -1;

        // On cherche l'auteur qui correspond et on l'assigne au livre.
        // Si "find" ne trouve pas l'auteur, alors null sera retourné.
        // $book->setAuthor($authorRepository->find($idAuthor));

        $em->persist($rapport);
        $em->flush();

        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);

        // $jsonRapport = $serializer->serialize($rapport, 'json');

        // $location = $urlGenerator->generate('rapports', [], UrlGeneratorInterface::ABSOLUTE_URL);

        // return new JsonResponse($jsonRapport, Response::HTTP_CREATED, ["Location" => $location], true);
    }

    #[Route('/api/rapport/{id}', name: "updateRapport", methods: ['PUT'])]
    public function updateRapport(Request $request, SerializerInterface $serializer, Rapport $currentRapport, EntityManagerInterface $em): JsonResponse
    {
        $updatedRapport = $serializer->deserialize(
            $request->getContent(),
            Rapport::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $currentRapport]
        );
        $content = $request->toArray();
        // $idAuthor = $content['idAuthor'] ?? -1;
        // $updatedBook->setAuthor($authorRepository->find($idAuthor));

        $em->persist($updatedRapport);
        $em->flush();
        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }

    #[Route('/api/rapport/delete/{id}', name: 'deleteRapport', methods: ['DELETE'])]
    public function deleteRapport(Rapport $rapport, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($rapport);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/rapport/detail/{id}', name: 'detailRapport', methods: ['GET'])]
    public function getDetailRapport(Rapport $rapport, SerializerInterface $serializer): JsonResponse
    {
        if ($rapport) {
            $jsonRapport = $serializer->serialize($rapport, 'json');
            return new JsonResponse($jsonRapport, Response::HTTP_OK, [], true);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }
}
