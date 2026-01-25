<?php

class Producto {
    private $db;
    private $conn;

    // constructor // le paso la base de datos para que pueda usar la conexion
    public function __construct($database) {
        $this->db = $database;
        $this->conn = $database->getConexion();
    }


    // inserto un producto si no existe
    public function insertar($nombre) {
        $sql = "INSERT IGNORE INTO productos (nombre) VALUES (?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $nombre);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // obtengo todos los productos
    public function obtenerTodos() {
        $sql = "SELECT * FROM productos ORDER BY nombre";
        $result = $this->conn->query($sql);
        
        $productos = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $productos[] = $row;
            }
        }
        return $productos;
    }

    // aquí compruebo si un producto existe
    public function existe($nombre) {
        $sql = "SELECT id FROM productos WHERE nombre = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $nombre);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->num_rows > 0;
    }
}
?>
