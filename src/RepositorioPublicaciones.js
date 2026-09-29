import Publicacion from "./Publicacion.js";
import PublicacionServicio from "./PublicacionServicio.js";
import PublicacionVenta from "./PublicacionVenta.js";
import Usuario from "./Usuario.js";
import { readFile, writeFile } from "node:fs/promises";


export default class RepositorioPublicaciones {
    constructor(ruta) {
        this.ruta = ruta;
        this.publicaciones = []; //arreglo de objetos Publicacion
        this.proximoId = 1;
    }

    async cargar() {
        try {
            const contenido = await readFile(this.ruta, "utf8");
            const datos = JSON.parse(contenido);

            this.publicaciones = datos.map(p => new Publicacion(p.id, p.autor, p.titulo, p.descripcion, p.categoria));

            const maxId = this.publicaciones.reduce((max, p) => (p.id > max ? p.id : max), 0);
            this.proximoId = maxId + 1;
        } catch (error) {
            if (error.code === "ENOENT") {
                await this.guardar();
            } else {
                throw error;
            }
        }
    }

    async guardar() {
        await writeFile(this.ruta, JSON.stringify(this.publicaciones, null, 2), "utf8");
    }

    async agregar(autor, titulo, descripcion, categoria = "general") {
        const nuevaPublicacion = new Publicacion(
            this.proximoId, autor, titulo, descripcion, categoria);

        this.publicaciones.push(nuevaPublicacion);
        this.proximoId++;
        await this.guardar();

        return nuevaPublicacion;
    }

    listar() {
        return [... this.publicaciones];
    }

    buscarPorId(id) {
        return this.publicaciones.find(p => String(p.id) === String(id)) || null;
    }

    async actualizar(id, cambios) {
        const pub = this.buscarPorId(id);
        if (!pub) return null;

        const autor = cambios.autor ?? pub.autor;
        const titulo = cambios.titulo ?? pub.titulo;
        const descripcion = cambios.descripcion ?? pub.descripcion;
        const categoria = cambios.categoria ?? pub.categoria;

        const actualizada = new Publicacion(pub.id, autor, titulo, descripcion, categoria);
        const index = this.publicaciones.findIndex(p => String(p.id) === String(id));
        this.publicaciones[index] = actualizada;

        await this.guardar();
        return actualizada;
    }

    async eliminar(id) {
        const index = this.publicaciones.findIndex(p => String(p.id) === String(id));
        if (index === -1) return false;

        this.publicaciones.splice(index, 1);
        await this.guardar();
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