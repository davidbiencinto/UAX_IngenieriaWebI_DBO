<?php
// API REST para obtener detalle de un producto
// usa la clase Precio con POO

header('Content-Type: application/json');

require_once '../Database.php';
require_once '../Precio.php';

// obtener el nombre del producto
$producto = $_GET['producto'] ?? '';

if (empty($producto)) {
    echo json_encode(['error' => 'Producto no especificado']);
    exit;
}

// creamos el objeto de base de datos y precio
$db = new Database();
$precioObj = new Precio($db);

// obtenemos el detalle usando el metodo de la clase
$detalle = $precioObj->obtenerDetalle($producto);

// devolvemos json
echo json_encode($detalle);
?>
