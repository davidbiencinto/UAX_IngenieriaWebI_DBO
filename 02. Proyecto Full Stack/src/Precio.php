<?php

class Precio {
    private $db;
    private $conn;

    // constructor // aquí inyecto la base de datos 
    public function __construct($database) {
        $this->db = $database;
        $this->conn = $database->getConexion();
    }

    // aquí recupero los precios con toda la info de producto y supermercados
    public function obtenerTodos() {
        $sql = "SELECT p.producto_nombre as nombre, s.name as supermercado, p.precio 
                FROM precios p 
                JOIN supermercados s ON p.supermercado_id = s.id 
                ORDER BY p.producto_nombre, p.precio";
        $result = $this->conn->query($sql);
        
        $precios = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $precios[] = array(
                    'nombre' => $row['nombre'],
                    'super' => $row['supermercado'],
                    'precio' => floatval($row['precio']));
            }
        }
        return $precios;

    }

    // aquí añado precio
    public function insertar($productoNombre, $supermercadoId, $precio) {
        $sql = "INSERT INTO precios (producto_nombre, supermercado_id, precio) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sid", $productoNombre, $supermercadoId, $precio);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // aquí recupero productos por nombre
    public function obtenerPorProducto($productoNombre) {
        $sql = "SELECT p.precio, s.name as supermercado 
                FROM precios p 
                JOIN supermercados s ON p.supermercado_id = s.id 
                WHERE p.producto_nombre = ? 
                ORDER BY p.precio";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $productoNombre);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $precios = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $precios[] = $row;
            }
        }

        return $precios;
    }

    // aquí busco precios por texto (nombre de producto o supermercado)
    public function buscar($texto) {
        $textoLike = "%" . $texto . "%";
        $sql = "SELECT p.producto_nombre as nombre, s.name as supermercado, p.precio 
                FROM precios p 
                JOIN supermercados s ON p.supermercado_id = s.id 
                WHERE p.producto_nombre LIKE ? OR s.name LIKE ?
                ORDER BY p.producto_nombre, p.precio";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ss", $textoLike, $textoLike);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $precios = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $precios[] = array(
                    'nombre' => $row['nombre'],
                    'super' => $row['supermercado'],
                    'precio' => floatval($row['precio'])
                );
            }
        }
        return $precios;
    }

    // aquí obtengo detalle completo de un producto con todos sus precios
    public function obtenerDetalle($productoNombre) {
        $sql = "SELECT p.producto_nombre as nombre, s.name as supermercado, p.precio, p.fecha_creacion
                FROM precios p 
                JOIN supermercados s ON p.supermercado_id = s.id 
                WHERE p.producto_nombre = ?
                ORDER BY p.precio";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $productoNombre);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $detalle = array(
            'producto' => $productoNombre,
            'precios' => array()
        );
        
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $detalle['precios'][] = array(
                    'supermercado' => $row['supermercado'],
                    'precio' => floatval($row['precio']),
                    'fecha' => $row['fecha_creacion']
                );
            }
        }
        
        return $detalle;
    }
}
?>
