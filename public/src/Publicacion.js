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
        this.etiquetas = []
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

    get resumen() {
        return `Autor: ${this.autor.nombre} - Titulo: "${this.titulo}" - Estado: ${this.activa}`
    }

    agregarEtiqueta(etiqueta) {
        const normalizada = etiqueta.trim();
        if (!normalizada) {
            throw new Error("Etiqueta inválida");
        }
        const yaExiste = this.tieneEtiqueta(normalizada);
        if (!yaExiste) {
            this.etiquetas.push(normalizada);
        }
    }

    tieneEtiqueta(etiqueta) {
        const buscada = etiqueta.trim().toLowerCase();
        return this.etiquetas.some(e => e.toLowerCase() === buscada);
    }

}
