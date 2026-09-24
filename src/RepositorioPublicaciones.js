import Publicacion from "./Publicacion.js";
import PublicacionServicio from "./PublicacionServicio.js";
import PublicacionVenta from "./PublicacionVenta.js";
import Usuario from "./Usuario.js";

class RepositorioPublicaciones {
    constructor() {
        this.publicaciones = []; //arreglo de objetos Publicacion
        this.proximoId = 1;
    }

    agregar(titulo, contenido, autor, categoria) {
        const publicacion = new Publicacion(
            this.proximoId++,
            titulo,
            contenido,
            autor,
            categoria,
        );
        this.publicaciones.push(publicacion);
        return publicacion;
    }

    listar() {
        return [...this.publicaciones];
    }

    buscarPorId(id) {
        return this.publicaciones.find((p) => p.id === Number(id));
    }

    actualizar(id, cambios) {
        const anterior = this.buscarPorId(id);
        if (!anterior) throw new Error("Publicación inexistente");
        const actualizada = new Publicacion(
            anterior.id,
            cambios.titulo ?? anterior.titulo,
            cambios.descripcion ?? anterior.descripcion,
            cambios.autor ?? anterior.autor,
            cambios.categoria ?? anterior.categoria,
        );
        // PASO 3: ¿qué pasa con activa, etiquetas, reportes y estado?
        // El constructor no los conoce: decidí si se pierden o se conservan,
        // y dejá la decisión documentada en un comentario.

        // Los perderia pero queremos mantenerlos, la idea es actualizar solo datos nuevos.
        actualizada.fechaPublicacion = anterior.fechaPublicacion;
        actualizada.activa = anterior.activa;
        actualizada.destacado = anterior.destacado;
        actualizada.etiquetas = anterior.etiquetas;
        actualizada.reportes = anterior.reportes;
        actualizada.estado = anterior.estado;

        this.publicaciones[this.publicaciones.indexOf(anterior)] = actualizada;
        return actualizada;
    }

    eliminar(id) {
        const publicacion = this.buscarPorId(id);
        if (!publicacion) return false;
        this.publicaciones.splice(this.publicaciones.indexOf(publicacion), 1);
        return true;
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

// Verificacion
const repo = new RepositorioPublicaciones()
// repo.agregar("vendoooo", "descripcion de mas de 20 caracteres", "juan", "aviso").agregarEtiqueta("venta")
repo.agregar("vendoooo", "descripcion de mas de 20 caracteres", "juan", "aviso")
console.log(repo.listar());
repo.eliminar(1)
// repo.actualizar(1, { titulo: "comprooooooooo" })
console.log(repo.listar());
