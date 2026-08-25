import Publicacion from "./Publicacion.js";
import PublicacionServicio from "./PublicacionServicio.js";
import PublicacionVenta from "./PublicacionVenta.js";
import RepositorioPublicaciones from "./RepositorioPublicaciones.js";
import Usuario from "./Usuario.js";

let usuarios = [
    new Usuario("Santiago", "santi@gmail.com"),
    new Usuario("Martin", "tincho@gmail.com"),
    new Usuario("Fabricio", "fabri@gmail.com"),
]

let publicaciones = [
    new PublicacionVenta("apuntes matematica", "Primeros ejercicios", usuarios[0], 1000),
    new PublicacionServicio("Clases de guitarra", "Aprende los acordes básicos", usuarios[0]),
    new PublicacionServicio("Clases de karate", "Defensa personal", usuarios[1]),
    new PublicacionVenta("resumen libro", "El señor de los anillos", usuarios[2]),
    new PublicacionVenta("examenes previos", "Apuntes para estudiar los examenes anteriores", usuarios[2])
];

publicaciones.forEach(publicacion => {
    console.log("Verificacion de instancia de Publicacion: ", publicacion instanceof Publicacion);
})


publicaciones.forEach(publicacion => {
    console.log("Resumen", publicacion.mostrarResumen());
})

const publicacionesActivas = publicaciones.filter(publicacion => publicacion.estaActiva())
const primeraPublicacion = publicaciones.find(publicacion => publicacion.autor.nombre === "Santiago")

console.log("Publicaciones activas:", publicacionesActivas);
console.log("Primera publicacion por nombre:", primeraPublicacion);

// Verificacion
usuarios[2].email = "fabricio@gmail.com"
const publicacionesFabri = publicaciones.filter(publicacion => publicacion.autor.nombre === "Fabricio")
console.log(publicacionesFabri);


// Parte 4
const repositorio = new RepositorioPublicaciones()
publicaciones.forEach(publi => repositorio.agregar(publi))
console.log("-----------------------");

repositorio.publicaciones.forEach(publi => console.log(publi))

console.log("Publicaciones de Santiago: ", repositorio.buscarPorUsuario("Santiago"))
console.log("Publicaciones de Martin: ", repositorio.buscarPorUsuario("Martin"))
console.log("Publicaciones de Fabricio: ", repositorio.buscarPorUsuario("Fabricio"))

// parte 4 desafio 1
console.log("------------------------");
console.log("------------------------");
publicaciones[1].activa = false
publicaciones[3].activa = false
console.log(repositorio.filtrarActivas())

// parte 4 desafio 2
console.log("------------------------");
console.log("Cantidad de publicaciones: ", repositorio.cantidadTotal());


//Practica 3: parte 4
// Desafío: agreguen un método listarPorTipo(claseConstructor) que devuelva solo las 
// publicaciones que son instancia de esa clase, usando instanceof.
console.log("=".repeat(30));
console.log("publicaciones de venta: ", repositorio.listarPorTipo(PublicacionVenta))

console.log("publicaciones de servicio: ", repositorio.listarPorTipo(PublicacionServicio))
