document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM cargado correctamente");

    // elementos del dom que vamos a usar
    const contenedor = document.getElementById('contenedor-productos');
    const form = document.getElementById('formProducto');
    
    // ventanas emergentes (modales)
    const modalAnadir = document.getElementById('modalAnadir');
    const modalBuscar = document.getElementById('modalBuscar');
    const modalDetalle = document.getElementById('modalDetalle');
    
    // botones de acciones (móvil y desktop)
    const btnMostrarBuscador = document.getElementById('btnMostrarBuscador');
    const btnMostrarAnadir = document.getElementById('btnMostrarAnadir');
    
    // botones para cerrar los modales
    const btnCerrarAnadir = document.querySelector('.close');
    const btnCerrarBuscar = document.querySelector('.close-search');
    const btnCerrarDetalle = document.querySelector('.close-detalle');
    
    // cosas de la busqueda
    const inputBusqueda = document.getElementById('inputBusqueda');
    const inputBusquedaMobile = document.getElementById('inputBusquedaMobile');
    const btnBuscar = document.getElementById('btnBuscar');
    const btnBuscarMobile = document.getElementById('btnBuscarMobile');

    // funcion para cargar precios desde la API REST usando la clase Precio
    function cargarProductosDesdeDB(textoBusqueda = '') {
        console.log('cargo productos desde DB // texto busqueda:', textoBusqueda || '(todos)');
        
        // construyo la URL con el parámetro de búsqueda si existe
        const url = textoBusqueda 
            ? `api/buscar.php?q=${encodeURIComponent(textoBusqueda)}`
            : 'api/buscar.php';
        
        console.log('hago fetch a:', url);
        
        fetch(url)
            .then(response => {
                console.log('respuesta recibida del servidor // status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('productos obtenidos // cantidad:', data.length);
                mostrarProductos(data);
            })
            .catch(error => {
                console.error('ERROR al cargar productos:', error);
                contenedor.innerHTML = '<p style="color: red;">Error al conectar con la base de datos</p>';
            });
    }

    // funcion para pintar los productos en el html
    function mostrarProductos(lista) {
        contenedor.innerHTML = '';

        if (lista.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron productos</p>';
            return;
        }

        lista.forEach(prod => {
            const div = document.createElement('div');
            div.className = 'producto-item';
            div.style.cursor = 'pointer';
            div.innerHTML = `
                <strong style="color: #2c3e50; font-size: 1.1rem;">${prod.nombre}</strong>
                <br>
                <span style="color: #7f8c8d;">${prod.super}</span>
                <br>
                <span style="color: #27ae60; font-size: 1.2rem; font-weight: bold;">${prod.precio.toFixed(2)}€</span>
            `;
            
            // añadir evento click para mostrar detalle
            div.addEventListener('click', () => {
                mostrarDetalle(prod.nombre);
            });
            
            contenedor.appendChild(div);
        });
    }

    // función para mostrar detalle de un producto
    function mostrarDetalle(nombreProducto) {
        console.log('muestro detalle de producto // nombre:', nombreProducto);
        
        // abro modal
        modalDetalle.style.display = 'block';
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


    // eventos para PC
    btnBuscar.addEventListener('click', () => {
        realizarBusqueda(inputBusqueda.value);
    });

    inputBusqueda.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            realizarBusqueda(inputBusqueda.value);
        }
    });

    // eventos para movil
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

    // gestion de los modales (abrir y cerrar)
    // abrir modal para añadir (móvil y desktop)
    btnMostrarAnadir.addEventListener('click', () => {
        modalAnadir.style.display = 'block';
    });

    // abrir modal buscar (solo en móvil)
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

    // cerrar modal detalle
    btnCerrarDetalle.addEventListener('click', () => {
        modalDetalle.style.display = 'none';
    });

    // cerrar modal si haces click fuera
    window.addEventListener('click', (e) => {
        if (e.target === modalAnadir) {
            modalAnadir.style.display = 'none';
        }
        if (e.target === modalBuscar) {
            modalBuscar.style.display = 'none';
        }
        if (e.target === modalDetalle) {
            modalDetalle.style.display = 'none';
        }
    });
t nuevoProducto = {
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
                
                // cierro la modal
                modalAnadir.style.display = 'none';
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
    console.log('inici error en la peticion:', error);
            alert('Error al conectar con el servidor');
        });
    });

    // cargo los productos al iniciar (sin filtro = todos)
    console.log('[inicio] iniciando aplicacion...');
    cargarProductosDesdeDB();
});
