CREATE TABLE IF NOT EXISTS supermercados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  codigo VARCHAR(50) NULL,
  UNIQUE KEY uniq_codigo (codigo)
);

CREATE TABLE IF NOT EXISTS precios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NOT NULL,
  supermercado_id INT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id),
  FOREIGN KEY (supermercado_id) REFERENCES supermercados(id)
);

# Datos iniciales (de prueba)
INSERT INTO supermercados(nombre)
    VALUES 
    ('Mercadona'), 
    ('Carrefour'), 
    ('Lidl');

INSERT INTO productos(nombre, codigo) 
    VALUES 
    ('Leche Entera 1L', '8410128010102'),
    ('Pan integral 500g', '7861009980532'),
    ('Huevos clase A (docena))', 'xxx'),
    ('Manzanas 1kg', 'xxx');

