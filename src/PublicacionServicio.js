import Publicacion from "./Publicacion.js";

class PublicacionServicio extends Publicacion {
    constructor(id, titulo, descripcion, autor, categoria, modalidad, duracionMinutos, cliente) {
        super(id, titulo, descripcion, autor, categoria)

        this.modalidad = modalidad // "presencial" o "virtual"
        this.duracionMinutos = duracionMinutos // number
        this.cliente = cliente // obj Usuario
    }

    get resumen() {
        return `${super.resumen} - Modalidad: ${this.modalidad} - Duracion: ${this.duracionMinutos} minutos`;
    }
}

export default PublicacionServicio