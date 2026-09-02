const titulo = document.getElementById("titulo")
const descripcion = document.getElementById("descripcion")
const autor = document.getElementById("autor")
const email = document.getElementById("email")
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