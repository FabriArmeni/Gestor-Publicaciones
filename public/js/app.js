const formulario = document.getElementById("pedido");
const lista = document.getElementById("lista-publicaciones");
const salida = document.getElementById("salida");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const respuesta = await fetch(formulario.action, {
        method: formulario.method,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(formulario)),
    });
    if (respuesta.ok) {
        // salida.textContent = await respuesta.text();
        salida.textContent = "Publicación creada correctamente."
        salida.dataset.tipo = respuesta.ok ? "exito" : "error";
        formulario.reset();
        await cargarPublicaciones(); // PASO 5E: refrescar el listado
    }
});

async function cargarPublicaciones() {
    // PASO 5D: fetch("/publicaciones") → renderizar <li> por cada publicación
    try {
        const respuesta = await fetch("/publicaciones")
        if(!respuesta.ok) {
            throw new Error("La respuesta no fue exitosa")
        }
        const publicaciones = await respuesta.json()
        renderizarPublicaciones(publicaciones)
    } catch (error) {
        salida.textContent = `Error al cargar publicaciones: ${error.message}`;
    }
}

function renderizarPublicaciones(publicaciones) {
    lista.replaceChildren(...publicaciones.map(crearTarjeta))
}

function crearTarjeta(publicacion) {
    console.log(publicacion);
    const {id, titulo, autor, descripcion, activa, categoria} = publicacion
    
    const tarjeta = document.createElement("li");
    if (publicacion.destacado) {
        tarjeta.classList.add("destacado")
    }
    const resumen = document.createElement("p");
    const estado = document.createElement("p");
    const boton = document.createElement("button");
    // const botonDestacar = document.createElement("button");

    tarjeta.setAttribute("data-id", id);
    resumen.textContent = `${titulo} (${categoria})- ${descripcion} - ${autor}`;
    estado.textContent = activa ? "Activa" : "Inactiva";

    boton.textContent = "Eliminar";
    boton.setAttribute("data-accion", "eliminar");
    // boton.disabled = publicacion.activa === false;

    // botonDestacar.textContent = "Destacar";
    // botonDestacar.setAttribute("data-accion", "destacar");

    tarjeta.classList.toggle("inactiva", publicacion.activa === false);
    // tarjeta.append(resumen, estado, boton, botonDestacar);
    tarjeta.append(resumen, estado, boton);

    return tarjeta;
}

async function manejarAccion(evento) {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton || !lista.contains(boton)) return;
    const tarjeta = boton.closest("[data-id]");
    const id = Number(tarjeta.dataset.id);

    // let publicacion = repositorio.publicaciones.find((p) => p.id === id);
    const accion = boton.dataset.accion;

    // if (accion === "baja") publicacion.darDeBaja();
    // if (accion === "destacar") publicacion.destacar();
    
    if (accion === "eliminar") {

        try {
            const respuesta = fetch(`/publicaciones/${id}`, {
                method: "delete"
            })
        } catch (error) {
            console.log(error);
            
        }
        
    }
    cargarPublicaciones()
}

lista.addEventListener("click", manejarAccion)