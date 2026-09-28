import e, { Router } from "express";

export default function crearRouterPublicaciones(repositorio) {
    const router = Router();

    router.get("/", (req, res) => {
        const lista = repositorio.listar();
        res.json(lista);
    });

    router.post("/", (req,res) => {
        try {
            const { autor, titulo, descripcion, categoria } = req.body;
            const nueva = repositorio.agregar(autor, titulo, descripcion, categoria);
            res.status(201).json(nueva);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    router.put("/:id", (req, res) => {
        try {
            const id = req.params.id;
            const cambios = req.body;
            const actualizada = repositorio.actualizar(id, cambios);
            res.json(actualizada);
        } catch (error) {
            if (error.message === "Publicacion inexistente") {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    });

    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        const borrado = repositorio.eliminar(id);
        if (borrado) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Publicacion inexistente" });
        }
    });

    return router;
}