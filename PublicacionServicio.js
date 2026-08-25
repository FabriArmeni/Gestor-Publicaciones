import Publicacion from "./Publicacion.js";

class PublicacionServicio extends Publicacion {
    constructor(titulo,descripcion, autor, modalidad, duracionMinutos) {
        super(titulo, descripcion, autor)
        this.modalidad = modalidad
        this.duracionMinutos = duracionMinutos
    }
}

export default PublicacionServicio