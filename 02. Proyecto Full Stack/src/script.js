document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM cargado correctamente");

    // elementos del dom que vamos a usar
    const contenedor = document.getElementById('contenedor-productos');
    const form = document.getElementById('formProducto');
    
    // ventanas emergentes (modales)
    const modalAnadir = document.getElementById('modalAnadir');
    const modalBuscar = document.getElementById('modalBuscar');
    const modalDetalle = document.getElementById('modalDetalle');
    
    // botones de acciones
    const btnMostrarAnadir = document.getElementById('btnMostrarAnadir');
    
    // botones para cerrar los modales
    const btnCerrarAnadir = document.querySelector('.close');
    const btnCerrarBuscar = document.querySelector('.close-search');
    const btnCerrarDetalle = document.querySelector('.close-detalle');
    
    // cosas de la busqueda - móvil (barra inferior)
    const inputBusqueda = document.getElementById('inputBusqueda');
    const btnBuscar = document.getElementById('btnBuscar');
    
    // búsqueda - desktop
    const inputBusquedaDesktop = document.getElementById('inputBusquedaDesktop');
    const btnBuscarDesktop = document.getElementById('btnBuscarDesktop');
    
    // búsqueda - modal móvil (por si acaso)
    const inputBusquedaMobile = document.getElementById('inputBusquedaMobile');
    const btnBuscarMobile = document.getElementById('btnBuscarMobile');

    function cargarProductosDesdeDB(textoBusqueda = '') {
        console.log('=== INICIANDO cargarProductosDesdeDB ===');
        console.log('cargo productos desde DB // texto busqueda:', textoBusqueda || '(todos)');
        
        // construyo la URL con el parámetro de búsqueda si existe
        const url = textoBusqueda 
            ? `api/buscar.php?q=${encodeURIComponent(textoBusqueda)}`
            : 'api/buscar.php';
        
        console.log('hago fetch a:', url);
        
        fetch(url)
            .then(response => {
                console.log('respuesta recibida del servidor // status:', response.status);
                if (!response.ok) {
                    console.error('ERROR: respuesta no OK:', response.status, response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('=== DATOS RECIBIDOS ===');
                console.log('productos obtenidos // cantidad:', data.length);
                console.log('primer producto:', data[0]);
                console.log('=======================');
                mostrarProductos(data);
            })
            .catch(error => {
                console.error('=== ERROR al cargar productos ===', error);
                contenedor.innerHTML = '<p style="color: red;">Error al conectar con la base de datos</p>';
            });
    }

    function mostrarProductos(lista) {
        console.log('=== MOSTRANDO PRODUCTOS ===');
        console.log('Cantidad a mostrar:', lista.length);
        contenedor.innerHTML = '';

        if (lista.length === 0) {
            console.log('No hay productos para mostrar');
            contenedor.innerHTML = '<p>No se encontraron productos</p>';
            return;
        }

        // agrupar productos por nombre y encontrar precio mínimo de cada uno
        const preciosPorProducto = {};
        lista.forEach(prod => {
            if (!preciosPorProducto[prod.nombre]) {
                preciosPorProducto[prod.nombre] = [];
            }
            preciosPorProducto[prod.nombre].push(prod.precio);
        });

        // calcular precio mínimo de cada producto
        const preciosMinimos = {};
        Object.keys(preciosPorProducto).forEach(nombre => {
            preciosMinimos[nombre] = Math.min(...preciosPorProducto[nombre]);
        });

        lista.forEach((prod, index) => {
            console.log(`Producto ${index + 1}:`, prod);
            const div = document.createElement('div');
            div.className = 'producto-item';
            div.style.cursor = 'pointer';
            
            // verificar si es el precio más bajo DE ESTE PRODUCTO
            const esPrecioMasBajo = prod.precio === preciosMinimos[prod.nombre];
            
            // cambiar estilo de la tarjeta si es el más bajo
            if (esPrecioMasBajo) {
                div.style.backgroundColor = '#d4edda';
                div.style.borderLeftColor = '#28a745';
                div.style.borderWidth = '3px';
            }
            
            const textoPrecio = esPrecioMasBajo 
                ? `${prod.precio.toFixed(2)}€ <strong>(Precio más bajo!)</strong>` 
                : `${prod.precio.toFixed(2)}€`;
            
            div.innerHTML = `
                <strong style="color: #2c3e50; font-size: 1.1rem;">${prod.nombre}</strong>
                <br>
                <span style="color: #7f8c8d;">${prod.super}</span>
                <br>
                <span style="color: #27ae60; font-size: 1.2rem; font-weight: bold;">${textoPrecio}</span>
            `;
            
            // añadir evento click para mostrar detalle
            div.addEventListener('click', () => {
                mostrarDetalle(prod.nombre);
            });
            
            contenedor.appendChild(div);
        });
        
        // efecto slideDown con jQuery al mostrar todos los productos
        $(contenedor).hide().slideDown(500);
    }

    // función para mostrar detalle de un producto
    function mostrarDetalle(nombreProducto) {
        console.log('=== MOSTRANDO DETALLE ===');
        console.log('muestro detalle de producto // nombre:', nombreProducto);
        
        // abro modal con jQuery
        $(modalDetalle).fadeIn(300);
        document.getElementById('detalleNombreProducto').textContent = nombreProducto;
        document.getElementById('detalleContenido').innerHTML = '<p>Cargando...</p>';
        
        // llamo a la API de detalle
        const url = `api/detalle.php?producto=${encodeURIComponent(nombreProducto)}`;
        console.log('hago fetch a detalle:', url);
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('detalle recibido // cantidad de precios:', data.precios?.length || 0);
                let html = '';
                
                if (data.precios && data.precios.length > 0) {
                    // encuentro precio mínimo y máximo
                    const precios = data.precios.map(p => p.precio);
                    const minPrecio = Math.min(...precios);
                    const maxPrecio = Math.max(...precios);
                    
                    console.log('precio minimo:', minPrecio, '// precio maximo:', maxPrecio);
                    
                    html = '<div class="detalle-precios">';
                    html += `<p><strong>Precio mínimo:</strong> ${minPrecio.toFixed(2)}€</p>`;
                    html += `<p><strong>Precio máximo:</strong> ${maxPrecio.toFixed(2)}€</p>`;
                    html += `<p><strong>Diferencia:</strong> ${(maxPrecio - minPrecio).toFixed(2)}€</p>`;
                    html += '<hr><h3>Precios por supermercado:</h3><ul>';
                    
                    data.precios.forEach(precio => {
                        const esMinimo = precio.precio === minPrecio;
                        html += `<li style="${esMinimo ? 'color: #27ae60; font-weight: bold;' : ''}">
                            ${precio.supermercado}: ${precio.precio.toFixed(2)}€
                            ${esMinimo ? ' (MEJOR PRECIO)' : ''}
                        </li>`;
                    });
                    
                    html += '</ul></div>';
                } else {
                    html = '<p>No hay información de precios disponible</p>';
                }
                
                document.getElementById('detalleContenido').innerHTML = html;
            })
            .catch(error => {
                console.error('ERROR al cargar detalle:', error);
                document.getElementById('detalleContenido').innerHTML = '<p style="color: red;">Error al cargar el detalle</p>';
            });
    }

    // búsqueda de productos / ahora se hace en el servidor
    function realizarBusqueda(textoBusqueda) {
        const texto = textoBusqueda.trim();
        console.log('realizo busqueda // texto:', texto);
        cargarProductosDesdeDB(texto);
    }

    // eventos para búsqueda - móvil (barra inferior)
    btnBuscar.addEventListener('click', () => {
        realizarBusqueda(inputBusqueda.value);
    });

    inputBusqueda.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            realizarBusqueda(inputBusqueda.value);
        }
    });

    // eventos para búsqueda - desktop
    if (btnBuscarDesktop) {
        btnBuscarDesktop.addEventListener('click', () => {
            realizarBusqueda(inputBusquedaDesktop.value);
        });
    }

    if (inputBusquedaDesktop) {
        inputBusquedaDesktop.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                realizarBusqueda(inputBusquedaDesktop.value);
            }
        });
    }

    // eventos para movil modal (por compatibilidad)
    if (btnBuscarMobile) {
        btnBuscarMobile.addEventListener('click', () => {
            realizarBusqueda(inputBusquedaMobile.value);
            modalBuscar.style.display = 'none';
        });
    }

    if (inputBusquedaMobile) {
        inputBusquedaMobile.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                realizarBusqueda(inputBusquedaMobile.value);
                modalBuscar.style.display = 'none';
            }
        });
    }

    // gestion de los modales (abrir y cerrar) con jQuery
    // abrir modal para añadir (móvil y desktop)
    btnMostrarAnadir.addEventListener('click', () => {
        $(modalAnadir).fadeIn(300);
    });

    // cerrar modal añadir
    btnCerrarAnadir.addEventListener('click', () => {
        $(modalAnadir).fadeOut(300);
    });

    // cerrar modal buscar (si existe)
    if (btnCerrarBuscar) {
        btnCerrarBuscar.addEventListener('click', () => {
            $(modalBuscar).fadeOut(300);
        });
    }

    // cerrar modal detalle
    btnCerrarDetalle.addEventListener('click', () => {
        $(modalDetalle).fadeOut(300);
    });

    // cerrar modal si haces click fuera (con jQuery)
    $(window).on('click', function(e) {
        if (e.target === modalAnadir) {
            $(modalAnadir).fadeOut(300);
        }
        if (e.target === modalBuscar) {
            $(modalBuscar).fadeOut(300);
        }
        if (e.target === modalDetalle) {
            $(modalDetalle).fadeOut(300);
        }
    });

    // formulario para agregar un nuevo precio
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('=== ENVIANDO FORMULARIO ===');
        
        const nuevoProducto = {
            producto: document.getElementById('producto').value,
            supermercado: document.getElementById('supermercado').value,
            precio: document.getElementById('precio').value
        };

        console.log('envio formulario // datos:', nuevoProducto);

        // envio a la API REST que usa las clases POO
        const formData = new FormData();
        formData.append('producto', nuevoProducto.producto);
        formData.append('supermercado', nuevoProducto.supermercado);
        formData.append('precio', nuevoProducto.precio);

        fetch('api/agregar_precio.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('respuesta del servidor:', data);
            if (data.success) {
                console.log('precio añadido correctamente // producto:', nuevoProducto.producto);
                alert('precio añadido correctamente!');
                console.log('recargo productos...');
                cargarProductosDesdeDB();
                form.reset();
                
                // cierro la modal con jQuery
                $(modalAnadir).fadeOut(300);
            } else {
                console.error('ERROR al añadir precio:', data.message);
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('ERROR en la peticion:', error);
            alert('Error al conectar con el servidor');
        });
    });

    // cargo los productos al iniciar (sin filtro = todos)
    console.log('===================================');
    console.log('[INICIO] Iniciando aplicacion...');
    console.log('===================================');
    cargarProductosDesdeDB();
});
