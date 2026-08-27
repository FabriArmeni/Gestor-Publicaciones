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

    listarPorTipo(claseConstructor) {
        return this.publicaciones.filter(publicacion => publicacion instanceof claseConstructor)
    }
    
    listarResumenes(){
        return this.publicaciones.map(p => p.mostrarResumen())
    }
    
    filtrarPorTipo(claseConstructor) {
        return this.publicaciones.filter(publicacion => publicacion instanceof claseConstructor)
    }
}

export default RepositorioPublicaciones