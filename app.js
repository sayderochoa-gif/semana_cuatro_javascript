
const URL_API = "https://663f733ae3a7c3216d4005b4.mockapi.io/api/v1/productos"; 


let productos = [];

const formularioProducto = document.getElementById("formularioProducto");
const idProductoInput = document.getElementById("idProducto");
const nombreProductoInput = document.getElementById("nombreProducto");
const precioProductoInput = document.getElementById("precioProducto");
const btnGuardar = document.getElementById("btnGuardar");
const btnSincronizar = document.getElementById("btnSincronizar");
const listaProductos = document.getElementById("listaProductos");
const mensajeEstado = document.getElementById("mensajeEstado");


window.addEventListener("DOMContentLoaded", async () => {
    cargarLocalStorage();
    renderizarProductosDOM();

    console.log("Iniciando carga de datos desde el servidor remoto...");
    await consumirApiGet();
});

formularioProducto.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const id = idProductoInput.value;
    const nombre = nombreProductoInput.value.trim();
    const precio = parseFloat(precioProductoInput.value);

    if (nombre === "" || isNaN(precio) || precio <= 0) {
        mostrarMensaje("Error: Nombre inválido o precio debe ser mayor a 0", "danger");
        return;
    }

    const datosProducto = {
        nombre: nombre,
        precio: precio
    };

    if (id === "") {
        await consumirApiPost(datosProducto);
    } else {

        await consumirApiPut(id, datosProducto);
    }

    formularioProducto.reset();
    idProductoInput.value = "";
    btnGuardar.textContent = "Guardar Producto";
    btnGuardar.style.backgroundColor = "#3498db";
});

btnSincronizar.addEventListener("click", async () => {
    await consumirApiGet();
});


function renderizarProductosDOM() {
    listaProductos.innerHTML = "";


    productos.forEach((producto) => {

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "between";
        li.style.alignItems = "center";
        
        const contenedorTexto = document.createElement("span");
        contenedorTexto.textContent = `${producto.nombre} - $${producto.precio}`;
        li.appendChild(contenedorTexto);

        const contenedorAcciones = document.createElement("div");
        contenedorAcciones.style.float = "right";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "✏️";
        btnEditar.style.backgroundColor = "#f39c12";
        btnEditar.style.color = "white";
        btnEditar.style.border = "none";
        btnEditar.style.padding = "4px 8px";
        btnEditar.style.marginRight = "6px";
        btnEditar.style.borderRadius = "4px";
        btnEditar.style.cursor = "pointer";
        
        btnEditar.addEventListener("click", () => {
            idProductoInput.value = producto.id;
            nombreProductoInput.value = producto.nombre;
            precioProductoInput.value = producto.precio;
            btnGuardar.textContent = "Actualizar Producto";
            btnGuardar.style.backgroundColor = "#f39c12";
            nombreProductoInput.focus();
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";

        btnEliminar.style.backgroundColor = "#e74c3c";
        btnEliminar.style.color = "white";
        btnEliminar.style.border = "none";
        btnEliminar.style.padding = "4px 10px";
        btnEliminar.style.borderRadius = "4px";
        btnEliminar.style.cursor = "pointer";

        btnEliminar.addEventListener("click", async () => {
            await consumirApiDelete(producto.id, li);
        });

        contenedorAcciones.appendChild(btnEditar);
        contenedorAcciones.appendChild(btnEliminar);
        li.appendChild(contenedorAcciones);
        listaProductos.appendChild(li);
    });
}

function mostrarMensaje(texto, tipo) {
    mensajeEstado.textContent = texto;
    mensajeEstado.style.color = tipo === "success" ? "#2ecc71" : "#e74c3c";
    
    console.log(`[Mensaje Sistema]: ${texto}`);

    setTimeout(() => {
        mensajeEstado.textContent = "";
    }, 3000);
}

function guardarLocalStorage() {
    localStorage.setItem("productos_app", JSON.stringify(productos));
    console.log("Cambios respaldados con éxito en Local Storage.");
}

function cargarLocalStorage() {
    const datosGuardados = localStorage.getItem("productos_app");
    if (datosGuardados) {
        productos = JSON.parse(datosGuardados);
        console.log(`Local Storage leído: Se cargaron temporalmente ${productos.length} elementos.`);
    } else {
        productos = [];
    }
}

async function consumirApiGet() {
    try {
        const respuesta = await fetch(URL_API);
        
        if (!respuesta.ok) {
            throw new Error(`Error del servidor: Código ${respuesta.status}`);
        }
        
        const datosServidor = await respuesta.getJson ? await respuesta.getJson() : await respuesta.json();
        
        productos = datosServidor;
        guardarLocalStorage();
        renderizarProductosDOM();
        
        mostrarMensaje("API cargada correctamente y sincronizada.", "success");
        console.log("Respuesta Servidor (GET):", datosServidor);
    } catch (error) {
        mostrarMensaje(`No se pudo sincronizar con el servidor: ${error.message}`, "danger");
        console.error("Detalle del Error (GET):", error);
    }
}

async function consumirApiPost(nuevoProducto) {
    try {
        const respuesta = await fetch(URL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoProducto)
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo añadir el registro en la API.");
        }

        const productoCreado = await respuesta.json();
        console.log("Respuesta Servidor (POST):", productoCreado);

        productos.push(productoCreado);
        guardarLocalStorage();
        renderizarProductosDOM();

        mostrarMensaje("¡Producto guardado y enviado al servidor con éxito!", "success");
    } catch (error) {
        mostrarMensaje(`Error al procesar POST: ${error.message}`, "danger");
        console.error("Detalle del Error (POST):", error);
    }
}

async function consumirApiPut(id, productoActualizado) {
    try {
        const respuesta = await fetch(`${URL_API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productoActualizado)
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo actualizar el registro en el servidor remoto.");
        }

        const datosModificados = await respuesta.json();
        console.log("Respuesta Servidor (PUT):", datosModificados);

        const indice = productos.findIndex(p => p.id == id);
        if (indice !== -1) {
            productos[indice] = datosModificados;
        }

        guardarLocalStorage();
        renderizarProductosDOM();

        mostrarMensaje("¡Producto actualizado correctamente en el servidor!", "success");
    } catch (error) {
        mostrarMensaje(`Error al procesar PUT: ${error.message}`, "danger");
        console.error("Detalle del Error (PUT):", error);
    }
}

async function consumirApiDelete(id, elementoLi) {
    try {
        const respuesta = await fetch(`${URL_API}/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo remover el elemento en el servidor remoto.");
        }

        console.log(`Respuesta Servidor (DELETE): Producto con id ${id} eliminado.`);

        listaProductos.removeChild(elementoLi);

        productos = productos.filter(producto => producto.id != id);
        
        guardarLocalStorage();

        mostrarMensaje("Producto eliminado con éxito de todas las fuentes.", "success");
    } catch (error) {
        mostrarMensaje(`Error al procesar DELETE: ${error.message}`, "danger");
        console.error("Detalle del Error (DELETE):", error);
    }
}