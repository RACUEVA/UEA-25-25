// Arreglo inicial de productos
const productos = [
    { nombre: "Laptop", precio: 1200, descripcion: "Portátil de alto rendimiento" },
    { nombre: "Teléfono", precio: 800, descripcion: "Smartphone con gran cámara" },
    { nombre: "Tablet", precio: 600, descripcion: "Ideal para leer y navegar" },
    { nombre: "Auriculares", precio: 150, descripcion: "Sonido envolvente y cómodo" },
    { nombre: "Reloj inteligente", precio: 250, descripcion: "Monitoriza tu salud y actividad" },
];

// Función para renderizar la lista de productos
function renderizarProductos() {
    const lista = document.getElementById('lista-productos');
    lista.innerHTML = '';
    productos.forEach(producto => {
    const item = document.createElement('li');
    item.innerHTML = `
        <strong>${producto.nombre}</strong> - $${producto.precio} <br>
        <em>${producto.descripcion}</em>
    `;
    lista.appendChild(item);
    });
}

// Evento para agregar un nuevo producto
document.getElementById('agregar-producto').addEventListener('click', () => {
    productos.push({
    nombre: "Nuevo Producto",
    precio: 0,
    descripcion: "Descripción breve"
    });
        renderizarProductos();
});

// Renderizar productos al cargar la página
window.onload = renderizarProductos;
