<?php
// clase para manejar operaciones de supermercados

class Supermercado {
    private $db;
    private $conn;

    public function __construct($database) {
        $this->db = $database;
        $this->conn = $database->getConexion();
    }

    // aquí obtengo el id de un supermercado por nombre
    public function obtenerIdPorNombre($nombre) {
        $sql = "SELECT id FROM supermercados WHERE name = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $nombre);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row['id'];
        }
        return null;
    }

    // aquí obtengo todos los supermercados
    public function obtenerTodos() {
        $sql = "SELECT * FROM supermercados ORDER BY name";
        $result = $this->conn->query($sql);
        
        $supermercados = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $supermercados[] = $row;
            }
        }
        return $supermercados;
    }
}
?>
