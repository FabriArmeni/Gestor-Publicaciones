class RepositorioPublicaciones {
    constructor(){
        this.publicaciones = [] //arreglo de objetos Publicacion
    }

    agregar(publicacion) { //publicacion: objeto Publicacion
        this.publicaciones.push(publicacion)
    }

    buscarPorUsuario(nombre) {
        return this.publicaciones.filter(p => p.autor.nombre === nombre)
    }

    filtrarActivas() {
        return this.publicaciones.filter(p => p.estaActiva())
    }

    cantidadTotal() {
        return this.publicaciones.length
    }
}

export default RepositorioPublicaciones