# Proyecto Full Stack - Ingeniería Web I (UAX)
# Supermertracker - Comparador de Precios de Supermercado

## Autor
- David Biencinto Onieva
- Febrero 2026

## 1. Descripción del Proyecto
Supermertracker es una aplicación web diseñada para ayudar a los usuarios a registrar y consultar precios de productos en diferentes supermercados. El objetivo principal es encontrar qué supermercado ofrece el precio más bajo para un producto concreto.

## 2. Funcionalidades
* **Gestión de Productos:** Añadir productos nuevos indicando nombre, precio y supermercado.
* **Buscador:** Localizar un producto y ver una lista comparativa de precios.
* **Dashboard:** Ver los últimos productos añadidos.

## 3. Tecnologías empeladas
* **Frontend:** HTML5, CSS3, JavaScript
* **Backend:** PHP (con POO), MySQL
* **Entorno de desarrollo:** Docker (docker-compose) sustituyendo a XAMPP, ya que yo trabajo con Mac y me es más cómodo contenerizar el entorno
* **Extras:** Node.js.

## 4. Instrucciones de Ejecución
Este proyecto utiliza Docker. Para iniciarlo, una vez instalado docker en el ordenador:
1.  Abre una terminal en la carpeta del proyecto
2.  Ejecuta: docker-compose up -d
3.  Accede a la web en: http://localhost:8080