<?php
// API REST para buscar precios por texto
// usa la clase Precio con POO

header('Content-Type: application/json');

require_once '../Database.php';
require_once '../Precio.php';

// obtener el parámetro de búsqueda
$texto = $_GET['q'] ?? '';

// creamos el objeto de base de datos y precio
$db = new Database();
$precioObj = new Precio($db);

// si hay texto, buscar; si no, devolver todos
if (!empty($texto)) {
    $precios = $precioObj->buscar($texto);
} else {
    $precios = $precioObj->obtenerTodos();
}

// devolvemos json
echo json_encode($precios);
?>
