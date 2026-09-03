import Usuario from "./modelos/Usuario.js"
import PublicacionVenta from "./modelos/PublicacionVenta.js"
import PublicacionServicio from "./modelos/PublicacionServicio.js"

const formulario = document.getElementById("form-publicacion")
const titulo = document.getElementById("titulo")
const descripcion = document.getElementById("descripcion")
const autor = document.getElementById("autor")
const email = document.getElementById("email")
const ayudaEmail = document.getElementById("ayuda-email")
const tipo = document.getElementById("tipo")
const camposEspecificos = document.getElementById("campos-especificos")
const vistaPrevia = document.getElementById("vista-previa")
const listaPublicaciones = document.getElementById("lista-publicaciones")

function observarEvento(evento) {
    console.table({
        type: evento.type,
        target: evento.target.id,
        currentTarget: evento.currentTarget.id,
        timeStamp: Math.round(evento.timeStamp)
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
function ocultarAyudaEmail() { ayudaEmail.textContent = ""; }
email.addEventListener("focus", mostrarAyudaEmail);
email.addEventListener("blur", ocultarAyudaEmail);


const publicaciones = [];
function crearPublicacionDesdeFormulario() {
    const usuario = new Usuario(autor.value, email.value);
    if (tipo.value === "venta") {
        return new PublicacionVenta(
            titulo.value, descripcion.value, usuario,
            Number(document.querySelector("#precio").value)
        );
    }
    return new PublicacionServicio(
        titulo.value, descripcion.value, usuario,
        document.querySelector("#modalidad").value,
        Number(document.querySelector("#duracion").value)
    );
}

function crearTarjeta(publicacion) {
    const resumen = publicacion.mostrarResumen()
    return `
        <div class="tarjeta">
            <p>${resumen}</p>
            <button onclick="darDeBaja(${publicacion.titulo})">Dar de baja</button>
        </div>
    `
}

function agregarTarjeta(publicacion) {
    const tarjeta = crearTarjeta(publicacion)
    listaPublicaciones.innerHTML += tarjeta
}

function darDeBaja(titulo) {
    publicaciones = publicaciones.filter(p => p.titulo !== titulo)
    renderizar()
}


function renderizar() {
  listaPublicaciones.replaceChildren(...publicaciones.map(crearTarjeta));
}


function manejarEnvio(evento) {
    evento.preventDefault();
    const publicacion = crearPublicacionDesdeFormulario();
    publicaciones.push(publicacion);
    agregarTarjeta(publicacion);
    formulario.reset();
    actualizarCamposEspecificos();
    actualizarVistaPrevia();
}
formulario.addEventListener("submit", manejarEnvio);