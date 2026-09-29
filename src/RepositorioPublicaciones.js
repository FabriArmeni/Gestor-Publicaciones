import Publicacion from "./Publicacion.js";
import PublicacionServicio from "./PublicacionServicio.js";
import PublicacionVenta from "./PublicacionVenta.js";
import Usuario from "./Usuario.js";
import { readFile, writeFile } from "node:fs/promises";

export default class RepositorioPublicaciones {
    constructor(ruta) {
        this.ruta = ruta;
        this.publicaciones = [];
        this.proximoId = 1;
    }

    // Instancia el tipo correcto de publicación según sus propiedades
    _instanciarPublicacion(dato) {
        const autor = dato.autor instanceof Usuario 
            ? dato.autor 
            : new Usuario(dato.autor.nombre, dato.autor.email);

        const id = dato.id ?? this.proximoId++;

        if (dato.precio !== undefined) {
            return new PublicacionVenta(
                id, dato.titulo, dato.descripcion, autor, dato.categoria ?? "compraventa", dato.precio
            );
        } else if (dato.modalidad) {
            const cliente = dato.cliente instanceof Usuario
                ? dato.cliente
                : new Usuario(dato.cliente.nombre, dato.cliente.email);
            return new PublicacionServicio(
                id, dato.titulo, dato.descripcion, autor, dato.categoria ?? "avisos", dato.modalidad, dato.duracionMinutos, cliente
            );
        } else {
            return new Publicacion(id, dato.titulo, dato.descripcion, autor, dato.categoria ?? "general");
        }
    }

    async cargar() {
        try {
            const contenido = await readFile(this.ruta, "utf8");
            const datos = JSON.parse(contenido);

            this.publicaciones = datos.map(p => this._instanciarPublicacion(p));

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

    async agregar(publicacionONuevosDatos) {
        let nuevaPublicacion;
        
        if (publicacionONuevosDatos instanceof Publicacion) {
            nuevaPublicacion = publicacionONuevosDatos;
            if (!nuevaPublicacion.id) {
                nuevaPublicacion.id = this.proximoId++;
            }
        } else {
            nuevaPublicacion = this._instanciarPublicacion(publicacionONuevosDatos);
        }

        this.publicaciones.push(nuevaPublicacion);
        await this.guardar();
        return nuevaPublicacion;
    }

    cargarDesde(datos) {
        datos.forEach((dato) => {
            const publi = this._instanciarPublicacion(dato);
            this.publicaciones.push(publi);
        });
    }

    listar() {
        return [...this.publicaciones];
    }

    buscarPorId(id) {
        return this.publicaciones.find(p => String(p.id) === String(id)) || null;
    }

    async actualizar(id, cambios) {
        const pub = this.buscarPorId(id);
        if (!pub) return null;

        Object.assign(pub, cambios);
        await this.guardar();
        return pub;
    }

    async eliminar(id) {
        const index = this.publicaciones.findIndex(p => String(p.id) === String(id));
        if (index === -1) return false;

        this.publicaciones.splice(index, 1);
        await this.guardar();
        return true;
    }

    buscarPorUsuario(nombre) {
        return this.publicaciones.filter((p) => {
            const nombreAutor = typeof p.autor === "object" ? p.autor.nombre : p.autor;
            return nombreAutor === nombre;
        });
    }

    filtrarActivas() {
        return this.publicaciones.filter((p) => p.activa);
    }

    cantidadTotal() {
        return this.publicaciones.length;
    }

    listarPorTipo(claseConstructor) {
        return this.publicaciones.filter((p) => p instanceof claseConstructor);
    }

    filtrarPorTipo(claseConstructor) {
        return this.listarPorTipo(claseConstructor);
    }

    listarResumenes() {
        return this.publicaciones.map((p) => p.resumen);
    }

    buscarPorEtiqueta(etiqueta) {
        return this.publicaciones.filter(
            (p) => p.activa && typeof p.tieneEtiqueta === "function" && p.tieneEtiqueta(etiqueta)
        );
    }

    pendientesDeRevision() {
        return this.publicaciones.filter(
            (p) => p.activa && typeof p.requiereRevision === "function" && p.requiereRevision()
        );
    }

    obtenerEstado() {
        const activas = this.filtrarActivas().length;
        return `Publicaciones activas: ${activas}`;
    }

    obtenerEstadoInactivas() {
        const inactivas = this.publicaciones.filter((p) => !p.activa).length;
        return `Publicaciones inactivas: ${inactivas}`;
    }
}