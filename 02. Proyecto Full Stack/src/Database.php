<?php
// clase para manejar la conexion a la base de datos
// uso POO para encapsular la logica de conexion
// leo las credenciales del archivo .env (mismo que docker-compose)

class Database {
    // propiedades privadas / encapsulacion
    private $host = 'db';
    private $dbname;
    private $user;
    private $pass;
    private $conn;

    // constructor / se ejecuta al crear el objeto
    public function __construct() {
        // obtengo las credenciales de las variables de entorno
        $this->dbname = getenv('MYSQL_DATABASE') ?: 'precios_db';
        $this->user = getenv('MYSQL_USER') ?: 'david';
        $this->pass = getenv('MYSQL_PASSWORD') ?: 'password';
        
        $this->conectar();
    }

    private function conectar() {
        $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->dbname);
        
        if ($this->conn->connect_error) {
            die("error al conectar: " . $this->conn->connect_error);
        }
        
        $this->conn->set_charset("utf8"); // para acentos y ñ
    }

    public function getConexion() {
        return $this->conn;
    }

    public function cerrar() {
        if ($this->conn) {
            $this->conn->close();
        }
    }

    // me aseguro de cerrar la conexión al terminar de usar este objeto de db
    public function __destruct() {
        $this->cerrar();
    }
}
?>
