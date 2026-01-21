<?php
// API REST para obtener supermercados
// usa la clase Supermercado con POO

header('Content-Type: application/json');

require_once '../Database.php';
require_once '../Supermercado.php';

// creamos el objeto de base de datos y supermercado
$db = new Database();
$supermercadoObj = new Supermercado($db);

// obtenemos todos los supermercados usando el metodo de la clase
$supermercados = $supermercadoObj->obtenerTodos();

// devolvemos json
echo json_encode($supermercados);
?>
