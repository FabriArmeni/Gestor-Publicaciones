export default class Publicacion {
    static contador = 1

    constructor(titulo, descripcion, autor) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.autor = autor; // objeto Usuario
        this.fechaPublicacion = new Date();
        this.activa = true;
        this.destacado = false
        this.id = Publicacion.contador++
    }

    mostrarResumen() {
        return `Titulo: "${this.titulo}" por ${this.autor.nombre}`;
    }

    estaActiva(){
        return this.activa;
    }

    diasPublicada() {
        const ms = new Date() - this.fechaPublicacion
        return Math.floor(ms / (1000 * 60 * 60 * 24))
    }

    darDeBaja() { this.activa = false; }

    destacar() { this.destacado = true }
    opacar() { this.destacado = false }
}
