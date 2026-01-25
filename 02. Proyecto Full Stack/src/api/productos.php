<?php
// API REST para obtener productos
// uso la clase Producto con POO

header('Content-Type: application/json');

require_once '../Database.php';
require_once '../Producto.php';

// aquí creo el objeto de base de datos y producto
$db = new Database();
$productoObj = new Producto($db);

// obtengo todos los productos usando el metodo de la clase
$productos = $productoObj->obtenerTodos();

// devuelvo json
echo json_encode($productos);
?>
