import Usuario from "./modelos/Usuario.js";
import PublicacionVenta from "./modelos/PublicacionVenta.js";
import PublicacionServicio from "./modelos/PublicacionServicio.js";
import RepositorioPublicaciones from "./modelos/RepositorioPublicaciones.js";

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

const repositorio = new RepositorioPublicaciones()

function observarEvento(evento) {
    console.table({
        type: evento.type,
        target: evento.target.id,
        currentTarget: evento.currentTarget.id,
        timeStamp: Math.round(evento.timeStamp),
    });
}
titulo.addEventListener("input", observarEvento);
tipo.addEventListener("change", observarEvento);

function actualizarVistaPrevia() {
    const nombre = autor.value || "Autor";
    const texto = titulo.value || "Sin título";
    vistaPrevia.textContent = `${texto} — ${nombre} (${tipo.value})`;
}

titulo.addEventListener("input", actualizarVistaPrevia);
autor.addEventListener("input", actualizarVistaPrevia);
tipo.addEventListener("change", actualizarVistaPrevia);

function actualizarCamposEspecificos() {
    if (tipo.value === "venta") {
        camposEspecificos.innerHTML = `
      <input id="precio" type="number" placeholder="Precio">
      <input id="stock" type="number" value="1">`;
    } else {
        camposEspecificos.innerHTML = `
      <select id="modalidad">
        <option>presencial</option><option>virtual</option>
      </select>
      <input id="duracion" type="number" placeholder="Minutos">`;
    }
}
tipo.addEventListener("change", actualizarCamposEspecificos);
actualizarCamposEspecificos();

function mostrarAyudaEmail() {
    ayudaEmail.textContent = "Usá un email válido del autor";
}
function ocultarAyudaEmail() {
    ayudaEmail.textContent = "";
}
email.addEventListener("focus", mostrarAyudaEmail);
email.addEventListener("blur", ocultarAyudaEmail);

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

    tarjeta.setAttribute("data-id", publicacion.id)
    resumen.textContent = publicacion.mostrarResumen();
    estado.textContent = publicacion.activa ? "Activa" : "Inactiva"

    boton.textContent = "Dar de baja";
    boton.disabled = publicacion.activa === false;
    boton.setAttribute("data-accion", "baja")

    botonDestacar.textContent = "Destacar"
    botonDestacar.setAttribute("data-accion", "destacar")

    tarjeta.classList.toggle("inactiva", publicacion.activa === false);
    tarjeta.append(resumen, estado, boton, botonDestacar);
    return tarjeta;
}

function agregarTarjeta(publicacion) {
    const tarjeta = crearTarjeta(publicacion);
    listaPublicaciones.append(tarjeta);
}

function renderizar() {
    listaPublicaciones.replaceChildren(...repositorio.publicaciones.map(crearTarjeta));
}

function manejarEnvio(evento) {
    evento.preventDefault();
    const publicacion = crearPublicacionDesdeFormulario();
    repositorio.agregar(publicacion);
    agregarTarjeta(publicacion);
    formulario.reset();
    // actualizarCamposEspecificos();
    // actualizarVistaPrevia();
    renderizar()
}
formulario.addEventListener("submit", manejarEnvio);

// Parte 1: cambia el target (lo que se clickea) y el currentTarget se mantiene (listaPublicaciones)
function observarClick(evento) {
    console.log("target", evento.target);
    console.log("currentTarget", evento.currentTarget);
}
listaPublicaciones.addEventListener("click", observarClick);
listaPublicaciones.removeEventListener("click", observarClick)

// Parte 3
function manejarAccion(evento) {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton || !listaPublicaciones.contains(boton)) return;
    const tarjeta = boton.closest("[data-id]");
    const id = Number(tarjeta.dataset.id);
    console.log(id, boton.dataset.accion);

    let publicacion = repositorio.publicaciones.find(p => p.id === id)
    const accion = boton.dataset.accion

    if (accion === "baja") publicacion.darDeBaja();
    if (accion === "destacar") publicacion.destacar();
    console.log(publicacion);
    
    renderizar();
}
listaPublicaciones.addEventListener("click", manejarAccion);