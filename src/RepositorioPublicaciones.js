import Publicacion from "./Publicacion.js";
import PublicacionServicio from "./PublicacionServicio.js";
import PublicacionVenta from "./PublicacionVenta.js";
import Usuario from "./Usuario.js";
import { readFile, writeFile } from "node:fs/promises";

class RepositorioPublicaciones {
    constructor(ruta) {
        this.ruta = ruta;
        this.publicaciones = []; //arreglo de objetos Publicacion
        this.proximoId = 1;
    }

    async cargar() {
        try {
            // PASO 7A: leer con readFile(this.ruta, "utf8"), JSON.parse,
            // reconstruir cada Publicacion (no queda con mostrarResumen si no lo hacés),
            // y recalcular this.proximoId como el máximo id + 1
            const data = JSON.parse(await readFile(this.ruta, "utf8"));
            this.publicaciones = data.map((d) => {
                const pub = new Publicacion(
                    d.id,
                    d.titulo,
                    d.descripcion,
                    d.autor,
                    d.categoria,
                );
                pub.fechaPublicacion = d.fechaPublicacion;
                pub.activa = d.activa;
                pub.destacado = d.destacado;
                pub.etiquetas = d.etiquetas;
                pub.reportes = d.reporte;
                pub.estado = d.estado;

                return pub;
            });

            this.proximoId =
                Math.max(0, ...this.publicaciones.map((p) => p.id)) + 1;
        } catch (error) {
            // PASO 7B: si error.code === "ENOENT" el archivo no existe todavía:
            // crearlo vacío con guardar(). Cualquier otro error se relanza.
            if (error.code !== "ENOENT") throw error;
            await this.guardar();
        }
        // es necesario reconstruir las publicaciones con new Publicacion porque el JSON.parse te devuelve objetos planos
    }

    async guardar() {
        // PASO 8A: writeFile(this.ruta, JSON.stringify(this.publicaciones, null, 2),"utf8")
        await writeFile(this.ruta, JSON.stringify(this.publicaciones, null, 2),"utf8")
    }

    // PASO 8C: aplicar el mismo cambio (async + await this.guardar())
    // a actualizar(id, cambios) y a eliminar(id)
    
    async agregar(titulo, descripcion, autor, categoria) {
        const publicacion = new Publicacion(
            this.proximoId++,
            titulo,
            descripcion,
            autor,
            categoria,
        );
        this.publicaciones.push(publicacion);
        // PASO 8B: await this.guardar() antes de devolver la publicación
        await this.guardar()
        return publicacion;
    }

    listar() {
        return [...this.publicaciones];
    }

    buscarPorId(id) {
        return this.publicaciones.find((p) => p.id === Number(id));
    }

    async actualizar(id, cambios) {
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
        await this.guardar()
        return actualizada;
    }

    async eliminar(id) {
        const publicacion = this.buscarPorId(id);
        if (!publicacion) return false;
        this.publicaciones.splice(this.publicaciones.indexOf(publicacion), 1);
        await this.guardar()
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

    filtrar({ autor, categoria, etiqueta }) {
        let filtrado = [...this.publicaciones].filter(pub => {
            let coincide = true
            if(autor && pub.autor !== autor) {
                coincide = false
            }
            if(categoria && pub.categoria !== categoria) {
                coincide = false                
            }
            if(etiqueta) {
                // tieneEtiqueta()
                if(pub.autor !== autor){
                    coincide = false
                }
            }
                

            if (coincide) {
                return pub
            }
        })
    }
}

export default RepositorioPublicaciones;
