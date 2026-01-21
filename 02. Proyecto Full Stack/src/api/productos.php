<?php
// API REST para obtener productos
// usa la clase Producto con POO

header('Content-Type: application/json');

require_once '../Database.php';
require_once '../Producto.php';

// creamos el objeto de base de datos y producto
$db = new Database();
$productoObj = new Producto($db);

// obtenemos todos los productos usando el metodo de la clase
$productos = $productoObj->obtenerTodos();

// devolvemos json
echo json_encode($productos);
?>
