import { Router } from "express";
import { CATEGORIAS_PERMITIDAS } from "../src/Publicacion.js";

export default function crearRouterPublicaciones(repositorio) {
    const router = Router();

    router.get("/", (req, res) => {
        // PASO 5A: devolver repositorio.listar() como JSON
        res.json(repositorio.listar());
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
