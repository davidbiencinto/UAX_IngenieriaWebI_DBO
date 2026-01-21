<?php
// API REST para obtener precios con info de productos y supermercados
// usa la clase Precio con POO

header('Content-Type: application/json');

require_once '../Database.php';
require_once '../Precio.php';

// creamos el objeto de base de datos y precio
$db = new Database();
$precioObj = new Precio($db);

// obtenemos todos los precios usando el metodo de la clase
$precios = $precioObj->obtenerTodos();

// devolvemos json
echo json_encode($precios);
?>
