<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Project;
use App\Repository\ProjectRepository;
use Psr\Log\LoggerInterface; // Importar LoggerInterface

final class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(ProjectRepository $projectRepository, LoggerInterface $logger): Response
    {
        $projects = $projectRepository->findAll();

        // Registrar en el log cuántos proyectos se encontraron
        $logger->info('Cantidad de proyectos encontrados: ' . count($projects));

        // Registrar los datos de los proyectos en el log
        foreach ($projects as $project) {
            $logger->info('Proyecto:', ['id' => $project->getId(), 'title' => $project->getTitle(), 'class' => $project->getClass()]);
        }

        return $this->render('home/index.html.twig', [
            'projects' => $projects,
        ]);
    }
}
