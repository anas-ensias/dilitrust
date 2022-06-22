<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * @IsGranted("ROLE_ADMIN")
 */
class NavigationController extends AbstractController
{
    /**
     * @Route("/home", name="home")
     */
    public function home(Session $session)
    {
        $return = [];

        if($session->has('message')) {
            $message = $session->get('message');
            $session->remove('message');
            $return['message'] = $message;
        }

        return $this->render('navigation/home.html.twig', $return);
    }

    /**
     * @Route("/membre", name="member")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     */
    public function member(Session $session)
    {
        $return = [];

        if($session->has('message')) {
            $message = $session->get('message');
            $session->remove('message');
            $return['message'] = $message;
        }

        return $this->render('navigation/member.html.twig', $return);
    }

    /**
     * @Route("/admin", name="admin")
     * @IsGranted("ROLE_ADMIN")
     */
    public function admin(Session $session)
    {
        $user = $this->getUser();

        // permissions check
        if(!$user) {
            $session->set("message", "Please sign in");
            return $this->redirectToRoute('app_login');
        } else if(in_array('ROLE_ADMIN', $user->getRoles())){
            return $this->render('navigation/admin.html.twig');
        }

        //redirection
        $session->set("message", "You don't have the rights to access to this page");
        return $this->redirectToRoute('home');
    }
}