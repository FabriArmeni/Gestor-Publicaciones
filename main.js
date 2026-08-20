import Publicacion from "./Publicacion.js";
import Usuario from "./Usuario.js";

let usuarios = [
    new Usuario("Santiago","santi@gmail.com"),
    new Usuario("Martin", "tincho@gmail.com"),
    new Usuario("Fabricio", "fabri@gmail.com"),
]

let publicaciones = [
    new Publicacion("apuntes matematica", "Primeros ejercicios", usuarios[0]),
    new Publicacion("apuntes guitarra", "Acordes basicos", usuarios[0]),
    new Publicacion("clases karate", "Defensa personal", usuarios[1]),
    new Publicacion("resumen libro", "El señor de los anillos", usuarios[2]),
    new Publicacion("examenes previos", "Apuntes para estudiar los examenes anteriores", usuarios[2])
];

publicaciones.forEach(publicacion => {
    console.log("Resumen", publicacion.mostrarResumen());
})

const publicacionesActivas = publicaciones.filter(publicacion => publicacion.estaActiva())
const primeraPublicacion = publicaciones.find(publicacion => publicacion.autor.nombre === "Santiago")

console.log("Publicaciones activas:", publicacionesActivas);
console.log("Primera publicacion por nombre:",primeraPublicacion);

// Verificacion
usuarios[2].email = "fabricio@gmail.com"
const publicacionesFabri = publicaciones.filter(publicacion => publicacion.autor.nombre === "Fabricio")
console.log(publicacionesFabri);
