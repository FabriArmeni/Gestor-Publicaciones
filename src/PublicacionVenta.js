import Publicacion from "./Publicacion.js";

class PublicacionVenta extends Publicacion {
    constructor(id, titulo,descripcion, autor, precio) {
        super(id, titulo, descripcion, autor)
        this.precio = precio
        this.stock = 1
    }

    mostrarResumen(){
        let base = super.mostrarResumen()
        base += ` - Precio: ${this.precio}`
        return base
    }
}

export default PublicacionVenta