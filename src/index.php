<?php
require_once __DIR__ . '/../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
$twig = new \Twig\Environment($loader,[
    'cache' => __DIR__ . '/../cache/twig',
    'auto_reload' => true,
]);

// Simple case based router: Add your routes here
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);


// Add cases for different routes and pass variables to the templates as needed
switch($path){
    case '/':
    case '/home':
        // Eg: passing a 'title' variable to the landing.twig template
        echo $twig->render('landing.twig',[
            'title'=> "Landing Page - Twig Starter Template",
            
        ]);
        break;
    case '/dashboard':
        echo $twig->render('dashboard.twig',[
            'title'=> "Dashboard - Twig Starter Template",
        ]);
        break;
    default:
    echo $twig->render('404.twig',[
        'title'=> "404 Not Found - Twig Starter Template",
    ]);
};
?>