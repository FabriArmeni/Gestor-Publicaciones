import Publicacion from "./Publicacion.js";
import PublicacionServicio from "./PublicacionServicio.js";
import PublicacionVenta from "./PublicacionVenta.js";
import Usuario from "./Usuario.js";

class RepositorioPublicaciones {
    constructor() {
        this.publicaciones = []; //arreglo de objetos Publicacion
    }

    agregar(autor, titulo, descripcion, categoria) {
        const nuevaPublicacion = new Publicacion(
            this.proximoId, autor, titulo, descripcion, categoria);

        this.publicaciones.push(nuevaPublicacion);
        this.proximoId++;

        return nuevaPublicacion;
    }

    listar() {
        return [... this.publicaciones];
    }

    buscarPorId(id) {
        const idNumerico = Number(id);
        return this.publicaciones.find((pub) => pub.id === idNumerico) || null;
    }

    buscarPorUsuario(nombre) {
        return this.publicaciones.filter((p) => p.autor.nombre === nombre);
    }

    filtrarActivas() {
        return this.publicaciones.filter((p) => p.estaActiva());
    }

    cantidadTotal() {
        return this.publicaciones.length;
    }

    listarPorTipo(claseConstructor) {
        return this.publicaciones.filter(
            (publicacion) => publicacion instanceof claseConstructor,
        );
    }

    listarResumenes() {
        return this.publicaciones.map((p) => p.mostrarResumen());
    }

    filtrarPorTipo(claseConstructor) {
        return this.publicaciones.filter(
            (publicacion) => publicacion instanceof claseConstructor,
        );
    }

    cargarDesde(datos) {
        const publicaciones = datos.map((dato) => {
            const autor = new Usuario(dato.autor.nombre, dato.autor.email);

            if (dato.precio) {
                return new PublicacionVenta(
                    dato.titulo,
                    dato.descripcion,
                    autor,
                    dato.precio,
                );
            } else if (dato.modalidad) {
                const cliente = new Usuario(
                    dato.cliente.nombre,
                    dato.cliente.email,
                );
                return new PublicacionServicio(
                    dato.titulo,
                    dato.descripcion,
                    autor,
                    dato.modalidad,
                    dato.duracionMinutos,
                    cliente,
                );
            } else {
                return new Publicacion(dato.titulo, dato.descripcion, autor);
            }
        });

        publicaciones.forEach((publi) => {
            this.publicaciones.push(publi);
        });
    }

    buscarPorEtiqueta(etiqueta) {
        return this.publicaciones.filter(
            (publicacion) =>
                publicacion.activa && publicacion.tieneEtiqueta(etiqueta),
        );
    }

    pendientesDeRevision() {
        return this.publicaciones.filter(
            (p) => p.activa && p.requiereRevision(),
        );
    }

    obtenerEstado() {
        const activas = this.publicaciones.filter((p) => p.activa).length;
        return `Publicaciones activas: ${activas}`;
    }

    obtenerEstadoInactivas() {
        const inactivas = this.publicaciones.filter((p) => !p.activa).length;
        return `Publicaciones inactivas: ${inactivas}`;
    }
}

export default RepositorioPublicaciones;