export default class Publicacion {
    constructor(titulo, descripcion, autor) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.autor = autor;
        this.fechaPublicacion = new Date();
        this.activa = true;
    }

    mostrarResumen() {
        return `Titulo: "${this.titulo}" por ${this.autor}`;
    }

    estaActiva(){
        return this.activa;
    }
}
