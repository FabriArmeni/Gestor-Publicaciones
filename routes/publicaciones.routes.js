import { Router } from "express";
import { CATEGORIAS_PERMITIDAS } from "../src/Publicacion.js";
import { paraExponer } from "../src/formatos.js";

export default function crearRouterPublicaciones(repositorio) {
    const router = Router();

    router.get("/", (req, res) => {
        const pagina = Number(req.query.pagina ?? 1);
        const limite = Number(req.query.limite ?? 10);
        if (!Number.isInteger(pagina) || pagina < 1 ||
            !Number.isInteger(limite) || limite < 1 || limite > 50) {
            return res.status(400).json({ error: "Paginación inválida" });
        }
        const { autor, categoria, etiqueta } = req.query;
        const filtradas = repositorio.filtrar({ autor, categoria, etiqueta });
        // PASO 1B: recortar la página con slice() y responder 200 con
        // { total, pagina, limite, publicaciones: [...].map(paraExponer) }

        const total = filtradas.length
        const inicio = (pagina - 1) * limite 
        if(inicio > total) return res.status(400).json({ error: "Paginación inválida" });
        const final = inicio + limite
        const paginadas = filtradas.slice(inicio, final)

        res.status(200).json({ total, pagina, limite, publicaciones: [...paginadas].map(paraExponer) })
    });
    router.get("/categorias", (req, res) => {
        // Ya existe desde la clase 16: devuelve CATEGORIAS_PERMITIDAS
        res.json(CATEGORIAS_PERMITIDAS);
    });
    router.post("/", (req, res) => {
        // PASO 5B: crear con repositorio.agregar(...) y responder 201/400
        try {
            const { titulo, descripcion, autor, categoria } = req.body;
            const publicacion = repositorio.agregar(
                titulo,
                descripcion,
                autor,
                categoria,
            );
            res.status(201).json(publicacion);
        } catch (error) {
            res.status(400).send(error.messsage);
        }
    });
    router.put("/:id", (req, res) => {
        try {
            const publicacion = repositorio.actualizar(req.params.id, req.body);
            if (!publicacion) {
                return res
                    .status(404)
                    .json({ error: "publicacion inexistente" });
            }
            res.status(200).json(publicacion);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    });

    router.delete("/:id", (req, res) => {
        try {
            const eliminada = repositorio.eliminar(Number(req.params.id));
            if (eliminada) {
                return res.status(204).end();
            } else {
                return res.status(404).json({ error: "Publicacion no encontrada" });
            }
        } catch (error) {
            res.status(400).json({ error: error });

        }
    });

    return router;
}
