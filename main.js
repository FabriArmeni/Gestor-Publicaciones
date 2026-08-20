import Publicacion from "./Publicacion.js";

let publicaciones = [
    new Publicacion("apuntes matematica", "Primeros ejercicios", "santi"),
    new Publicacion("apuntes guitarra", "Acordes basicos", "paco"),
    new Publicacion("clases karate", "Defensa personal", "martin"),
    new Publicacion("resumen libro", "El señor de los anillos", "fabri")
];

publicaciones[1].activa = false;

let quinta = new Publicacion("vender cursos", "Ser tu propio jefe", "nacho")
publicaciones.push(quinta)

for (let i = 0; i < publicaciones.length; i++){
    console.log(publicaciones[i].mostrarResumen())
    console.log(publicaciones[i].estaActiva())
}
console.log("---------------------------------------------")
console.log("---------------------------------------------")
let contador = 0;
for (let i = 0; i < publicaciones.length; i++){
    if (publicaciones[i].activa === true){
        contador++;
        console.log(publicaciones[i].mostrarResumen())
        console.log(publicaciones[i].estaActiva())
    }
}
console.log(`Publicaciones activas = ${contador}`)