<?php
// agregar un nuevo precio a la bd

header('Content-Type: application/json');

// incluir config
include 'config.php';

// obtener datos del POST
$producto = $_POST['producto'] ?? '';
$supermercado = $_POST['supermercado'] ?? '';
$precio = $_POST['precio'] ?? 0;

// primero insertar el producto si no existe
$sql_producto = "INSERT IGNORE INTO productos (nombre) VALUES (?)";
$stmt = $conn->prepare($sql_producto);
$stmt->bind_param("s", $producto);
$stmt->execute();

// obtener el id del supermercado
$sql_super = "SELECT id FROM supermercados WHERE name = ?";
$stmt = $conn->prepare($sql_super);
$stmt->bind_param("s", $supermercado);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $supermercado_id = $row['id'];
    
    // insertar el precio
    $sql_precio = "INSERT INTO precios (producto_nombre, supermercado_id, precio) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql_precio);
    $stmt->bind_param("sid", $producto, $supermercado_id, $precio);
    
    if ($stmt->execute()) {
        echo json_encode(array('success' => true, 'message' => 'precio añadido correctamente'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'error al insertar precio'));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'supermercado no encontrado'));
}

$conn->close();
?>
