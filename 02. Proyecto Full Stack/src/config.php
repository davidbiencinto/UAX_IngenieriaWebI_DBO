<?php
// configuracion de la base de datos
// usa las variables de entorno del archivo .env (mismo que docker-compose)

$host = 'db'; // nombre del servicio en docker

// uso getenv para leer variable de entorno del fichero .env (así la config de docker-compose al crear los contenedores es la
// misma que la que usa la aplicación)
$dbname = getenv('MYSQL_DATABASE') ?: 'precios_db'; 
$user = getenv('MYSQL_USER') ?: 'david';
$pass = getenv('MYSQL_PASSWORD') ?: 'password';

// abro conex con mysql (conn es la conexión que devuelvo y se usará en otros ficheros9)
$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("error al conectar: " . $conn->connect_error);
}
$conn->set_charset("utf8"); // para que no de problemas con acentos y ñ

?>
