import Publicacion from "./Publicacion.js";

class PublicacionServicio extends Publicacion {
    constructor(titulo,descripcion, autor, modalidad, duracionMinutos) {
        super(titulo, descripcion, autor)
        this.modalidad = modalidad // "presencial" o "virtual"
        this.duracionMinutos = duracionMinutos // number
    }

    mostrarResumen(){
        let base = super.mostrarResumen()
        base += ` - Modalidad: ${this.modalidad} - Duracion: ${this.duracionMinutos} minutos`
        return base
    }
}

export default PublicacionServicio