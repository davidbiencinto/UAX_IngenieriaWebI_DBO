<?php
// API REST para agregar un precio
// uso las clases Producto, Supermercado y Precio con POO

header('Content-Type: application/json');

require_once '../Database.php';
require_once '../Producto.php';
require_once '../Supermercado.php';
require_once '../Precio.php';

// aquí obtengo datos del POST
$producto = $_POST['producto'] ?? '';
$supermercado = $_POST['supermercado'] ?? '';
$precio = $_POST['precio'] ?? 0;

// creo los objetos - patron de uso de POO
$db = new Database();
$productoObj = new Producto($db);
$supermercadoObj = new Supermercado($db);
$precioObj = new Precio($db);

// primero añado producto si no existe usando el metodo de la clase
$productoObj->insertar($producto);

// aquí recupero el id de supermercado usando el metodo
$supermercado_id = $supermercadoObj->obtenerIdPorNombre($supermercado);

if ($supermercado_id) {
    // añado el precio usando el metodo
    if ($precioObj->insertar($producto, $supermercado_id, $precio)) {
        echo json_encode(['success' => true, 'message' => 'precio añadido correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'error al insertar precio']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'supermercado no encontrado']);
}
?>
