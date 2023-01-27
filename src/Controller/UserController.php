<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserController extends AbstractController
{
    #[Route('/user', name: 'app_user')]
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }

    #[Route('/api/users', name: 'users', methods: ['GET'])]
    public function getUserList(UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $userList = array_reverse($userRepository->findAll());
        $jsonUserList = $serializer->serialize($userList, 'json');
        return new JsonResponse($jsonUserList, Response::HTTP_OK, [], true);
    }

    #[Route('/api/user', name: "createUser", methods: ['POST'])]
    public function createUser(Request $request, SerializerInterface $serializer, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        $content = $request->toArray();
        $password = $content['password'] ?? -1;
        $role = $content['role'] === 'ROLE_ADMIN' ? 'ROLE_ADMIN' : 'ROLE_USER';

        $user->setPassword($userPasswordHasher->hashPassword($user, $password));
        $user->setRole($role);

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }

    #[Route('/api/edit_user', name: "editUser", methods: ['POST'])]
    public function editUser(Request $request, SerializerInterface $serializer, UserPasswordHasherInterface $userPasswordHasher, UserRepository $userRepo, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        $content = $request->toArray();
        $id = $content['id'] ?? -1;
        $firstname = $content['firstname'] ?? -1;
        $lastname = $content['lastname'] ?? -1;
        $email = $content['email'] ?? -1;
        $password = $content['password'] ?? -1;
        $role = $content['role'] === 'ROLE_ADMIN' ? 'ROLE_ADMIN' : 'ROLE_USER';

        /**
         * @var User
         */
        $editUser = $userRepo->find($id);

        $editUser->setFirstname($firstname);
        $editUser->setLastname($lastname);
        $editUser->setEmail($email);
        $editUser->setPassword($userPasswordHasher->hashPassword($user, $password));
        $editUser->setRole($role);

        $entityManager->persist($editUser);
        $entityManager->flush();

        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }

    #[Route('/api/user/{id}', name: "updateUser", methods: ['PUT'])]
    public function updateUser(Request $request, SerializerInterface $serializer, User $currentUser, UserRepository $userRepo, EntityManagerInterface $em): JsonResponse
    {
        $updatedUser = $serializer->deserialize($request->getContent(), User::class, 'json');

        $idUser = $content['id'] ?? -1;
        $firstname = $content['firstname'] ?? -1;
        $lastname = $content['lastname'] ?? -1;

        /**
         * @var User
         */
        $user = $userRepo->find($idUser);

        $user->setFirstname($firstname);
        $user->setLastname($lastname);

        $em->persist($user);
        $em->flush();
        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }

    #[Route('/api/user/delete/{id}', name: 'deleteUser', methods: ['DELETE'])]
    public function deleteUser(User $user, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($user);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/user/detail/{id}', name: 'detailUser', methods: ['GET'])]
    public function getDetailUser(User $user, SerializerInterface $serializer): JsonResponse
    {
        if ($user) {
            $jsonUser = $serializer->serialize($user, 'json');
            return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }
    #[Route(path: '/api/login/{id}', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }
}
