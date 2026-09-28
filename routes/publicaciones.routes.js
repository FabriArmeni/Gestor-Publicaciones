import { Router } from "express";

export default function crearRouterPublicaciones(repositorio) {
    const router = Router();

    router.get("/", (req, res) => {
        res.json(repositorio.listar());
    });

    router.post("/", async (req,res) => {
        try {
            const { autor, titulo, descripcion, categoria } = req.body;
            const nueva = await repositorio.agregar(autor, titulo, descripcion, categoria);
            res.status(201).json(nueva);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    router.put("/:id", async (req, res) => {
        try {
            const actualizada = await repositorio.actualizar(req.params.id, req.body);
            if (!actualizada) return res.status(404).json({ error: "No encontrada"});
            res.json(actualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    router.delete("/:id", async (req, res) => {
        const exito = await repositorio.eliminar(req.params.id);
        if (!exito) return res.status(404).json({ error: "No encontrada" });
        res.status(204).send();
    });

    return router;
}