import Publicacion from "./Publicacion.js";

class PublicacionVenta extends Publicacion {
    constructor(id, titulo, descripcion, autor, categoria = "compraventa", precio) {
        super(id, titulo, descripcion, autor, categoria)

        if (typeof precio !== "number" || precio <= 0) {
            throw new Error("El precio debe ser mayor a 0")
        }

        this.precio = precio
        this.stock = 1
    }

    get resumen(){
        return `${super.resumen} - Precio: $${this.precio}`;
    }
}

export default PublicacionVenta