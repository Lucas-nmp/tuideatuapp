<?php

namespace App\Controller;

use App\Entity\Latest;
use App\Form\LatestType;
use App\Repository\LatestRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/latest')]
final class LatestController extends AbstractController
{
    #[Route(name: 'app_latest_index', methods: ['GET'])]
    public function index(LatestRepository $latestRepository): Response
    {
        return $this->render('latest/index.html.twig', [
            'latests' => $latestRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_latest_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $latest = new Latest();
        $form = $this->createForm(LatestType::class, $latest);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($latest);
            $entityManager->flush();

            return $this->redirectToRoute('app_latest_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('latest/new.html.twig', [
            'latest' => $latest,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_latest_show', methods: ['GET'])]
    public function show(Latest $latest): Response
    {
        return $this->render('latest/show.html.twig', [
            'latest' => $latest,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_latest_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Latest $latest, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(LatestType::class, $latest);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_latest_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('latest/edit.html.twig', [
            'latest' => $latest,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_latest_delete', methods: ['POST'])]
    public function delete(Request $request, Latest $latest, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$latest->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($latest);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_latest_index', [], Response::HTTP_SEE_OTHER);
    }
}
