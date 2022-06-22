<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bridge\Doctrine\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/users")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/sign-up", name="create_new_user", methods={"GET", "POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return Response
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function postCreateNewUser(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        // get params
        $data = $request->getContent();
        $data = json_decode($data, true);

        /** @var User $user */
        $user = new User();

        // create new user
        $entityManager = $this->getDoctrine()->getManager();
        $user->setUsername($data['username']);
        $user->setPassword($passwordEncoder->encodePassword($user, $data['password']));
        $role = ['ROLE_ADMIN'];
        $user->setRoles($role);
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(Response::HTTP_OK);
    }

    /**
     * @Route("/all", name="app_user_show", methods={"GET"})
     * @param \Doctrine\Persistence\ManagerRegistry $doctrine
     * @return Response
     */
    public function getAllUsers(\Doctrine\Persistence\ManagerRegistry $doctrine): Response
    {
        $usersList = [];
        $repository = $doctrine->getRepository(User::class);
        $users = $repository->findAll();

        /** @var User $user */
        foreach ($users as $user) {
            $collection = [
                'id' => $user->getId(),
                'userName' => $user->getUsername(),
                'roles' => $user->getRoles(),
            ];

            $usersList [] = $collection;
        }

        return new JsonResponse($usersList, Response::HTTP_OK);
    }

    /**
     * @Route("/{id}", name="app_user_edit", methods={"PUT"})
     * @param int $id
     * @param Request $request
     * @param \Doctrine\Persistence\ManagerRegistry $doctrine
     * @return Response
     */
    public function putEditUser(int $id, Request $request, \Doctrine\Persistence\ManagerRegistry $doctrine): Response
    {
        // get params
        $data = $request->getContent();
        $data = json_decode($data, true);

        $repository = $doctrine->getRepository(User::class);
        /** @var User $user */
        $user = $repository->find($id);

        // update user
        $entityManager = $this->getDoctrine()->getManager();
        $user->setUsername($data['username']);
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse('user updated', Response::HTTP_OK);
    }

    /**
     * @Route("/{id}", name="app_user_delete", methods={"DELETE"})
     * @param int $id
     * @param \Doctrine\Persistence\ManagerRegistry $doctrine
     * @return Response
     */
    public function deleteUser(int $id, \Doctrine\Persistence\ManagerRegistry $doctrine): Response
    {
        // get user using id passed as param
        $repository = $doctrine->getRepository(User::class);
        $user = $repository->find($id);

        // delete user
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($user);
        $entityManager->flush();

        return new JsonResponse('user deleted', Response::HTTP_OK);
    }
}