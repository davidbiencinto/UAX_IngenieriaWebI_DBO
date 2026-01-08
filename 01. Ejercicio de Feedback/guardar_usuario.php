<?php
// Conectar a la base de datos
$conexion = new mysqli("mysql", "root", "", "ejercicios");

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Crear la tabla si no existe
$crear_tabla = "CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100)
)";

if (!$conexion->query($crear_tabla)) {
    die("Error al crear la tabla: " . $conexion->error);
}

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$email = $_POST['email'];

// Insertar en la base de datos
$sql = "INSERT INTO usuarios (nombre, email) VALUES ('$nombre', '$email')";

if (!$conexion->query($sql)) {
    die("Error al guardar usuario: " . $conexion->error . "<br><br>Por favor, crea la tabla ejecutando el archivo crear_base_datos.sql en <a href='http://localhost:8081' target='_blank'>phpMyAdmin</a>");
}

$conexion->close();

// Redirigir de vuelta al formulario
header("Location: ejercicio_g.php");
exit();
?>
