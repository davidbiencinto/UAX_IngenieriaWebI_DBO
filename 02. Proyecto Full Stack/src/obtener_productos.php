<?php
// obtener todos los productos y precios de la bd

header('Content-Type: application/json');

// incluir configuracion
include 'config.php';

// query para obtener productos con precios
$sql = "SELECT p.producto_nombre as nombre, s.name as supermercado, p.precio 
        FROM precios p 
        JOIN supermercados s ON p.supermercado_id = s.id 
        ORDER BY p.producto_nombre, p.precio";

$result = $conn->query($sql);

$productos = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $productos[] = array(
            'nombre' => $row['nombre'],
            'super' => $row['supermercado'],
            'precio' => floatval($row['precio'])
        );
    }
}

// devolver json
echo json_encode($productos);

$conn->close();
?>
