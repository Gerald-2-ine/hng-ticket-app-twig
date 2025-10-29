<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Initialize Twig
$loader = new FilesystemLoader(__DIR__ . '/../src/templates');
$twig = new Environment($loader, ['cache' => false]);

// Basic Router
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {
    case '/':
    case '/landing':
        echo $twig->render('landing.twig');
        break;

    case '/login':
        echo $twig->render('login.twig');
        break;

    case '/signup':
        echo $twig->render('signup.twig');
        break;

    case '/dashboard':
        echo $twig->render('dashboard.twig');
        break;

     case '/tickets':
        echo $twig->render('tickets.twig');
        break;

    default:
        http_response_code(404);
        echo $twig->render('404.twig');
        break;
}
