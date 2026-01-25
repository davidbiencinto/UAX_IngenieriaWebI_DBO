<?php
// API REST para buscar precios por texto
// uso la clase Precio con POO

header('Content-Type: application/json');

require_once '../Database.php';
require_once '../Precio.php';

// aquí obtengo el parámetro de búsqueda
$texto = $_GET['q'] ?? '';

// aquí creo el objeto de base de datos y precio
$db = new Database();
$precioObj = new Precio($db);

// si hay texto, buscar; si no, devuelvo todos
if (!empty($texto)) {
    $precios = $precioObj->buscar($texto);
} else {
    $precios = $precioObj->obtenerTodos();
}

// devuelvo json
echo json_encode($precios);
?>
