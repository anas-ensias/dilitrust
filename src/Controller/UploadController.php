<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @IsGranted("ROLE_ADMIN")
 */

/**
 * @Route("/api")
 */
class UploadController extends AbstractController
{
    /**
     * @Route("/files", name="post_file", methods={"POST"})
     * @param Request $request
     * @return Response
     * @throws \Exception
     */
    public function postFile(Request $request): Response
    {
        // get params
        $file = $request->files->get('file');

        // create file name
        $fileName = $file->getClientOriginalName();
        $date = new \DateTime();
        $timestampFileName = $date->getTimestamp() . '-' . $fileName;

        // store file in a local directory: public/uploads
        $file->move(
            $this->getParameter('files'),
            $timestampFileName
        );

        // get file path
        $filePath = $this->getParameter('files') . '/' . $timestampFileName;

        return new JsonResponse($filePath, Response::HTTP_OK);
    }

    /**
     * @Route("/files", name="get_files", methods={"GET"})
     * @return Response
     */
    public function getFiles(): Response
    {
        $filesList = [];

        $finder = new Finder();

        // find all files in the files directory (public/uploads)
        $finder->files()->in($this->getParameter('files'));

        foreach ($finder as $file) {
            $collection = [
                'fileName' => $file->getBasename(),
                'path' => $file->getRealPath(),
                'size' => filesize($file->getRealpath()),
            ];

            $filesList [] = $collection;
        }

        return new JsonResponse($filesList, Response::HTTP_OK);
    }

    /**
     * @Route("/files/{fileName}", name="delete_file", methods={"DELETE"})
     * @param $fileName
     * @return Response
     */
    public function deleteFile($fileName): Response
    {
        // delete file
        $filesystem = new Filesystem();
        $filesystem->remove($this->getParameter('files') . '/' .$fileName);

        return new JsonResponse('File deleted successfully', Response::HTTP_OK);
    }
}