CREATE TABLE IF NOT EXISTS supermercados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS precios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_nombre VARCHAR(150) NOT NULL,
  supermercado_id INT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_nombre) REFERENCES productos(nombre),
  FOREIGN KEY (supermercado_id) REFERENCES supermercados(id)
);

# Datos iniciales (de prueba)
INSERT INTO supermercados(name)
    VALUES 
    ('Mercadona'), 
    ('Carrefour'), 
    ('Lidl');

INSERT INTO productos(nombre) 
    VALUES 
    ('Leche Entera 1L'),
    ('Pan integral 500g'),
    ('Huevos clase A (docena)'),
    ('Manzanas 1kg');

INSERT INTO precios(producto_nombre, supermercado_id, precio)
    VALUES 
    ('Leche Entera 1L', 1, 1.20),
    ('Leche Entera 1L', 2, 1.15),
    ('Leche Entera 1L', 3, 0.99),
    ('Pan integral 500g', 1, 1.80),
    ('Pan integral 500g', 2, 1.75),
    ('Pan integral 500g', 3, 1.50),
    ('Huevos clase A (docena)', 1, 2.50),
    ('Huevos clase A (docena)', 2, 2.40),
    ('Manzanas 1kg', 1, 2.30),
    ('Manzanas 1kg', 3, 1.99);

