<?php
// Conecto a BD
$conexion = new mysqli("mysql", "root", "", "ejercicios");
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Creamos la tabla si no existiera para que no de errores la primera vez
$crear_tabla = "CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100)
)";

if (!$conexion->query($crear_tabla)) {
    $error_mensaje = "Error al crear la tabla: " . $conexion->error;
}

// obtengo  usuarios
$resultado = $conexion->query("SELECT * FROM usuarios ORDER BY id DESC");

if (!$resultado) {
    $error_mensaje = "Error en la consulta: " . $conexion->error;
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Ejercicio G - Registro</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <div class="contenedor">
    <h1>Gestión de usuarios en MySQL</h1>
    
    <form action="guardar_usuario.php" method="POST">
        <p>Nombre: <input type="text" name="nombre" required></p>
        <p>Email: <input type="email" name="email" required></p>
        <button type="submit">Guardar</button>
    </form>
    
    <hr>
    
    <h2>Listado de Usuarios</h2>
    <?php if (isset($error_mensaje)): ?>
        <p style="color: red;"><?php echo $error_mensaje; ?></p>
        <p>Por favor, crea la base de datos ejecutando el archivo crear_base_datos.sql manualmente.</p>
    <?php elseif ($resultado && $resultado->num_rows > 0): ?>
        <table border="1" cellpadding="10" style="width: 100%; border-collapse: collapse;">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
            </tr>
            <?php while($usuario = $resultado->fetch_assoc()): ?>
            <tr>
                <td><?php echo $usuario['id']; ?></td>
                <td><?php echo $usuario['nombre']; ?></td>
                <td><?php echo $usuario['email']; ?></td>
            </tr>
            <?php endwhile; ?>
        </table>
    <?php else: ?>
        <p>No hay usuarios en la tabla</p>
    <?php endif; ?>
    
    <a href="index.html" class="volver"><button type="button">Volver</button></a>
    </div>
</body>
</html>

<?php
$conexion->close();
?>
