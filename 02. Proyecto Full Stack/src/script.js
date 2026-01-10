document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM cargado correctamente");

    // elementos del dom que vamos a usar
    const contenedor = document.getElementById('contenedor-productos');
    const form = document.getElementById('formProducto');
    
    // modales (ventanas emergentes)
    const modalAnadir = document.getElementById('modalAnadir');
    const modalBuscar = document.getElementById('modalBuscar');
    
    // botones del movill
    const btnMostrarBuscador = document.getElementById('btnMostrarBuscador');
    const btnMostrarAnadir = document.getElementById('btnMostrarAnadir');
    
    // botones para cerrar los modales
    const btnCerrarAnadir = document.querySelector('.close');
    const btnCerrarBuscar = document.querySelector('.close-search');
    
    // cosas de la busqueda
    const inputBusqueda = document.getElementById('inputBusqueda');
    const inputBusquedaMobile = document.getElementById('inputBusquedaMobile');
    const btnBuscar = document.getElementById('btnBuscar');
    const btnBuscarMobile = document.getElementById('btnBuscarMobile');

    // productos que vienen de la base de datos
    let productosSimulados = [];
    let productosFiltrados = [];

    // funcion para cargar productos desde php
    function cargarProductosDesdeDB() {
        console.log('[cargando] intentando conectar con la base de datos...');
        
        fetch('obtener_productos.php')
            .then(response => {
                console.log('[ok] respuesta recibida del servidor!');
                return response.json();
            })
            .then(data => {
                console.log('[ok] conectado a la base de datos!');
                console.log('[datos] productos obtenidos:', data.length);
                productosSimulados = data;
                productosFiltrados = [...productosSimulados];
                mostrarProductos(productosFiltrados);
            })
            .catch(error => {
                console.error('[error] error al cargar productos:', error);
                contenedor.innerHTML = '<p style="color: red;">Error al conectar con la base de datos</p>';
            });
    }

    // funcion para pintar los productos en el html
    function mostrarProductos(lista) {
        contenedor.innerHTML = '';

        lista.forEach(prod => {
            const div = document.createElement('div');
            div.className = 'producto-item';
            div.innerHTML = `
                <strong style="color: #2c3e50; font-size: 1.1rem;">${prod.nombre}</strong>
                <br>
                <span style="color: #7f8c8d;">${prod.super}</span>
                <br>
                <span style="color: #27ae60; font-size: 1.2rem; font-weight: bold;">${prod.precio.toFixed(2)}€</span>
            `;
            contenedor.appendChild(div);
        });
    }

    // funcion de busqueda - filtra los productos
    function realizarBusqueda(textoBusqueda) {
        const texto = textoBusqueda.toLowerCase().trim();
        
        productosFiltrados = productosSimulados.filter(prod => 
            prod.nombre.toLowerCase().includes(texto) ||
            prod.super.toLowerCase().includes(texto)
        );
        
        mostrarProductos(productosFiltrados);
    }

    // eventos para buscar en pc
    btnBuscar.addEventListener('click', () => {
        realizarBusqueda(inputBusqueda.value);
    });

    inputBusqueda.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            realizarBusqueda(inputBusqueda.value);
        }
    });

    // eventos para buscar en movil
    btnBuscarMobile.addEventListener('click', () => {
        realizarBusqueda(inputBusquedaMobile.value);
        modalBuscar.style.display = 'none';
    });

    inputBusquedaMobile.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            realizarBusqueda(inputBusquedaMobile.value);
            modalBuscar.style.display = 'none';
        }
    });

    // gestion de los modaless (abrir y cerrar)
    // abrir modal para añadir
    btnMostrarAnadir.addEventListener('click', () => {
        modalAnadir.style.display = 'block';
    });

    // abrir modal buscar (solo en movil)
    btnMostrarBuscador.addEventListener('click', () => {
        modalBuscar.style.display = 'block';
    });

    // cerrar modal añadir
    btnCerrarAnadir.addEventListener('click', () => {
        modalAnadir.style.display = 'none';
    });

    // cerrar modal buscar
    btnCerrarBuscar.addEventListener('click', () => {
        modalBuscar.style.display = 'none';
    });

    // cerrar modal si haces click fuera
    window.addEventListener('click', (e) => {
        if (e.target === modalAnadir) {
            modalAnadir.style.display = 'none';
        }
        if (e.target === modalBuscar) {
            modalBuscar.style.display = 'none';
        }
    });

    // formulario - cuando envian el formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        console.log('[form] enviando formulario...');
        
        const nuevoProducto = {
            producto: document.getElementById('producto').value,
            supermercado: document.getElementById('supermercado').value,
            precio: document.getElementById('precio').value
        };

        console.log('[datos] datos a enviar:', nuevoProducto);

        // enviar con fetch a php
        const formData = new FormData();
        formData.append('producto', nuevoProducto.producto);
        formData.append('supermercado', nuevoProducto.supermercado);
        formData.append('precio', nuevoProducto.precio);

        fetch('agregar_precio.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('[ok] añadido a bd el producto:', nuevoProducto.producto);
                alert('¡Precio añadido correctamente!');
                
                // recargar productos desde la bd
                console.log('[recargando] recargando productos...');
                cargarProductosDesdeDB();
                
                // limpiar el formulario
                form.reset();
                
                // cerrar el modal
                modalAnadir.style.display = 'none';
            } else {
                console.error('[error] error al añadir:', data.message);
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('[error] error en la peticion:', error);
            alert('Error al conectar con el servidor');
        });
    });

    // cargar los productos al iniciar
    console.log('[inicio] iniciando aplicacion...');
    cargarProductosDesdeDB();
});
