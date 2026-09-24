import Publicacion from "./Publicacion.js";

class PublicacionServicio extends Publicacion {
    constructor(id, titulo,descripcion, autor, modalidad, duracionMinutos, cliente) {
        super(id, titulo, descripcion, autor)
        this.modalidad = modalidad // "presencial" o "virtual"
        this.duracionMinutos = duracionMinutos // number
        this.cliente = cliente // obj Usuario
    }

    mostrarResumen(){
        let base = super.mostrarResumen()
        base += ` - Modalidad: ${this.modalidad} - Duracion: ${this.duracionMinutos} minutos`
        return base
    }
}

export default PublicacionServicio