import Usuario from "../../src/Usuario.js";
import PublicacionVenta from "../../src/PublicacionVenta.js";
import PublicacionServicio from "../../src/PublicacionServicio.js";
import RepositorioPublicaciones from "../../src/RepositorioPublicaciones.js";

const formulario = document.getElementById("form-publicacion");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const autor = document.getElementById("autor");
const email = document.getElementById("email");
const ayudaEmail = document.getElementById("ayuda-email");
const tipo = document.getElementById("tipo");
const camposEspecificos = document.getElementById("campos-especificos");
const vistaPrevia = document.getElementById("vista-previa");
const listaPublicaciones = document.getElementById("lista-publicaciones");
const estado = document.getElementById("estado");
const botonActualizar = document.getElementById("botonActualizar");
const botonForzarError = document.getElementById("botonForzarError");
const errorTitulo = document.getElementById("errorTitulo");
const errorAutor = document.getElementById("errorAutor");
const enviar = document.getElementById("enviar");

const repositorio = new RepositorioPublicaciones();

function actualizarVistaPrevia() {
    const texto = titulo.value || "Sin título";
    const nombre = autor.value || "Autor";
    vistaPrevia.textContent = `${texto} — ${nombre} (${tipo.value})`;
}

function actualizarCamposEspecificos() {
    if (tipo.value === "venta") {
        camposEspecificos.innerHTML = `
            <input id="precio" type="number" placeholder="Precio">
            <small id="errorPrecio"></small>
            <input id="stock" type="number" value="1">`;

        const precio = camposEspecificos.querySelector("#precio");
        const errorPrecio = camposEspecificos.querySelector("#errorPrecio");

        function validarPrecio(mostrarError = true) {
            const valido = Number(precio.value) > 0;
            precio.classList.toggle("valido", valido);
            precio.classList.toggle("invalido", !valido && mostrarError);
            errorPrecio.textContent =
                !valido && mostrarError ? "Ingrese un precio mayor que 0" : "";
            return valido;
        }

        precio.addEventListener("input", () => validarPrecio(false));
        precio.addEventListener("blur", () => validarPrecio(true));
    } else {
        camposEspecificos.innerHTML = `
            <select id="modalidad">
                <option>presencial</option><option>virtual</option>
            </select>
            <input id="duracion" type="number" placeholder="Minutos">`;
    }
}

function mostrarAyudaEmail() {
    ayudaEmail.textContent = "Usá un email válido del autor";
}

function ocultarAyudaEmail() {
    ayudaEmail.textContent = "";
}

function crearPublicacionDesdeFormulario() {
    const usuario = new Usuario(autor.value, email.value);
    if (tipo.value === "venta") {
        return new PublicacionVenta(
            titulo.value,
            descripcion.value,
            usuario,
            Number(document.querySelector("#precio").value),
        );
    }
    return new PublicacionServicio(
        titulo.value,
        descripcion.value,
        usuario,
        document.querySelector("#modalidad").value,
        Number(document.querySelector("#duracion").value),
    );
}

function crearTarjeta(publicacion) {
    const tarjeta = document.createElement("article");
    const resumen = document.createElement("p");
    const estado = document.createElement("p");
    const boton = document.createElement("button");
    const botonDestacar = document.createElement("button");

    tarjeta.setAttribute("data-id", publicacion.id);
    resumen.textContent = publicacion.mostrarResumen();
    estado.textContent = publicacion.activa ? "Activa" : "Inactiva";

    boton.textContent = "Dar de baja";
    boton.disabled = publicacion.activa === false;
    boton.setAttribute("data-accion", "baja");

    botonDestacar.textContent = "Destacar";
    botonDestacar.setAttribute("data-accion", "destacar");

    tarjeta.classList.toggle("inactiva", publicacion.activa === false);
    tarjeta.append(resumen, estado, boton, botonDestacar);

    return tarjeta;
}

function agregarTarjeta(publicacion) {
    const tarjeta = crearTarjeta(publicacion);
    listaPublicaciones.append(tarjeta);
}

function renderizarPublicaciones() {
    listaPublicaciones.replaceChildren(
        ...repositorio.publicaciones.map(crearTarjeta),
    );
}

function esperar(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function manejarEnvio(evento) {
    evento.preventDefault();
    if (!validarTitulo(true)) return;
    enviar.disabled = true;
    estado.textContent = "Publicando...";
    try {
        await esperar(800);
        const publicacion = crearPublicacionDesdeFormulario();
        repositorio.agregar(publicacion);
        agregarTarjeta(publicacion);
        renderizarPublicaciones();
        estado.textContent = "Publicación agregada";
        formulario.reset();
        actualizarVistaPrevia();
    } catch (error) {
        estado.textContent = `Error: ${error.message}`;
    } finally {
        actualizarEstadoFormulario();
    }
}

function manejarAccion(evento) {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton || !listaPublicaciones.contains(boton)) return;
    const tarjeta = boton.closest("[data-id]");
    const id = Number(tarjeta.dataset.id);

    let publicacion = repositorio.publicaciones.find((p) => p.id === id);
    const accion = boton.dataset.accion;

    if (accion === "baja") publicacion.darDeBaja();
    if (accion === "destacar") publicacion.destacar();

    renderizarPublicaciones();
}

async function cargarPublicaciones(forzarError = false) {
    estado.textContent = "Cargando publicaciones...";
    botonActualizar.disabled = true;
    try {
        const url = forzarError
            ? "/api/publicaciones?error=1"
            : "/api/publicaciones";
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error("La respuesta no fue exitosa");
        }
        const datos = await respuesta.json();
        repositorio.cargarDesde(datos);
        renderizarPublicaciones();
        estado.textContent = `${datos.length} publicaciones recibidas`;
    } catch (error) {
        estado.textContent = `Error: ${error.message}`;
    } finally {
        botonActualizar.disabled = false;
    }
}

function validarTitulo(mostrarError = true) {
    const valido = titulo.value.trim().length >= 5;
    titulo.classList.toggle("valido", valido);
    titulo.classList.toggle("invalido", !valido && mostrarError);
    errorTitulo.textContent =
        !valido && mostrarError ? "Ingrese al menos 5 caracteres" : "";
    return valido;
}

function validarAutor(mostrarError = true) {
    const valido = autor.value.trim().length >= 3;
    autor.classList.toggle("valido", valido);
    autor.classList.toggle("invalido", !valido && mostrarError);
    errorAutor.textContent =
        !valido && mostrarError ? "Ingrese al menos 3 caracteres" : "";
    return valido;
}

function formularioValido() {
    const precioValido =
        tipo.value !== "venta" ||
        Number(camposEspecificos.querySelector("#precio").value) > 0;
    return (
        titulo.value.trim().length >= 5 &&
        autor.value.trim().length >= 3 &&
        precioValido
    );
}

function actualizarEstadoFormulario() {
    enviar.disabled = !formularioValido();
}

actualizarCamposEspecificos();
actualizarVistaPrevia();
actualizarEstadoFormulario();

// listeners
titulo.addEventListener("input", () => validarTitulo(false));
titulo.addEventListener("blur", () => validarTitulo(true));

autor.addEventListener("input", () => validarAutor(false));
autor.addEventListener("blur", () => validarAutor(true));

tipo.addEventListener("change", actualizarCamposEspecificos);

[titulo, autor, tipo].forEach((control) =>
    control.addEventListener("input", actualizarVistaPrevia),
);

email.addEventListener("focus", mostrarAyudaEmail);
email.addEventListener("blur", ocultarAyudaEmail);

formulario.addEventListener("submit", manejarEnvio);
formulario.addEventListener("input", actualizarEstadoFormulario);
listaPublicaciones.addEventListener("click", manejarAccion);

botonActualizar.addEventListener("click", () => cargarPublicaciones());
botonForzarError.addEventListener("click", () => cargarPublicaciones(true));

document.querySelector("#consultar").addEventListener("click", async () => {
    estado.textContent = "Consultando...";
    try {
        const respuesta = await fetch("/estado-comunidad");
        if (!respuesta.ok) {
            throw new Error("La respuesta no fue exitosa");
        }
        const texto = await respuesta.text();
        estado.textContent = texto;
    } catch (error) {
        estado.textContent = `No se pudo consultar el estado: ${error.message}`;
    }
});
