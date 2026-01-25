# SuperMertracker - Comparador de Precios
### Proyecto FullStack para Ingeniería Web I (UAX, 2026)
### **David Biencinto Onieva**  
### Código descargable desde: https://github.com/davidbiencinto/UAX_IngenieriaWebI_DBO
--------------------------------------------------------------------------------

## Objetivo
Desarrollo de una web para comparar precios de productos en diferentes supermercados. La hice porque nunca sabía dónde comprar más barato, porque para los mismos productos, cada supermercado tiene diferentes precios.
Básicamente añades productos con su precio y super, buscas, y te marca en verde el más barato de cada producto. 

A futuro se podría incluso extenderlo y convertirlo en una especie de red social o plataforma colaborativa, sacar estadísticas de precio, mostrar la evolución de precios de un producto, saber cuanto suiben los precios un determinado supermercado, etc.
Por eso me parecío una app interesante sobre la que empezar a trabajar.

## Funcionalidad
- Añades productos con su precio y el supermercado donde lo compraste
- Buscas por nombre de producto (botón buscar, o pulsando enter) y también por supermercado
- Te muestra el precio más bajo de cada producto (en verde con fondo) y el resto de precios para comparar
- Click en un producto y ves el detalle completo

## Responsive
Se adapta al móvil. En escritorio los botones están arriba, en móvil se van abajo pegados a los dedos. También cambia el título según el tamaño de pantalla.

## Stack tecnológico
**Frontend:** HTML, CSS, JavaScript, jQuery (para modales y el efecto slide al mostrar los productos)  
**Backend:** PHP con POO (clases para Producto, Precio, Supermercado, Database)
**Base de datos:** MySQL  
**Entorno:** En mi caso, docker (MySQL + PHP + Apache), pero funciona con XAMPP o lo que sea con tan solo instalar los mismos servidores y configurarlos en el código

Al principio lo hice procedural (se puede ver en el historial del github), luego refactoricé todo a orientación a objetos.

## Cómo ejecutarlo
**Opción 1 - con docker:**
```bash
docker-compose up -d
```
Luego ve a http://localhost:8080

**Opción 2 - sin docker (XAMPP, etc):**
1. Copia `src` a tu htdocs
2. Importa `db/init.sql` en MySQL
3. Configura credenciales en `Database.php`

## Archivos importantes del proyecto
- `index.html` - Fichero web principal (punto de entrada a la app)
- `Precio.php`, `Producto.php`, `Supermercado.php`, `Database.php` - Clases de PHP con la lógica de la aplicación con las entidades que intervienen (precio, producto, supermercado donde se vende), y para manejar la base de datos de MySQL
- `.env` - Credenciales de Docker
- `db/init.sql` - Script SQL con estructura y datos de prueba (en esa carpeta también he puesto el fichero docker para configurar el server mysql)
- `docker/php` - Aquí está el fichero docker para configurar el server web con php
- `src/api/` - Endpoints REST en PHP
- `docker-compose.yml` - Este es el punto de arranque si usas docker, el fichero que compone todos los dockerfiles del proyecto y el que levanta el sistema (server mysql, server apache, ...)

--------------------------------------------------------------------------------
