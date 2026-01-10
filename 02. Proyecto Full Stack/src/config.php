<?php
// configuracion de la base de datos
// datos del docker-compose

$host = 'db'; // nombre del servicio en docker
$dbname = 'precios_db';
$user = 'david';
$pass = 'password';

// conexion con mysqli
$conn = new mysqli($host, $user, $pass, $dbname);

// comprobamos que funcione
if ($conn->connect_error) {
    die("error al conectar: " . $conn->connect_error);
}

// para que no de problemas con acentos y ñ
$conn->set_charset("utf8");

// si todo va bien no devuelve nada, solo se usa la variable $conn
?>
