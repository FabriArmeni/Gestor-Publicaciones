import RepositorioPublicaciones from "../src/RepositorioPublicaciones.js";

import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

 const carpeta = await mkdtemp(join(tmpdir(), "publicaciones-"));
 const ruta = join(carpeta, "datos.json");

describe("RepositorioPublicaciones · CRUD", () => {
    let repositorio;
    beforeEach(() => {
        repositorio = new RepositorioPublicaciones(ruta);
    });
    test("agregar asigna ids crecientes a partir de 1", async() => {
        // PASO 6A
        await repositorio.agregar(
            "vendoo",
            "ventaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "juancito",
            "compraventa",
        );
        await repositorio.agregar(
            "vendoo",
            "ventaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "mengano",
            "compraventa",
        );
        expect(repositorio.listar()[0].id).toBe(1);
        expect(repositorio.listar()[1].id).toBe(2);
    });
    test("listar devuelve una copia: modificarla no afecta al repositorio", async() => {
        // PASO 6B
        await repositorio.agregar(
            "vendoo",
            "ventaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "juancito",
            "compraventa",
        );
        await repositorio.agregar(
            "vendoo",
            "ventaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "mengano",
            "compraventa",
        );
        const lista = repositorio.listar()
        lista.pop()
        expect(repositorio.listar().length).toBe(2);
    });
    test("actualizar con datos inválidos no modifica la colección", async() => {
        // PASO 6C
        await repositorio.agregar(
            "vendoo",
            "ventaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "juancito",
            "compraventa",
        );
        expect(async() => await repositorio.actualizar(1, {"titulo":""})).rejects.toThrow("El título debe tener entre 5 y 80 caracteres")
        expect(repositorio.buscarPorId(1).titulo).toBe("vendoo")
    });
    test("eliminar una publicación inexistente devuelve false", async() => {
        // PASO 6D
        expect(await repositorio.eliminar(1)).toBe(false)
    });

    // Si actualizás sólo el título de una publicación que ya tenía 3 reportes acumulados,
    // ¿esos reportes deberían perderse? Fundamentá tu decisión en la resolución.
    test("Si actualizas solo el titulo no se pierden los reportes", async() => {
        // PASO 6C
        await repositorio.agregar(
            "vendoo",
            "ventaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "juancito",
            "compraventa",
        );
        const publicacion = repositorio.buscarPorId(1)
        publicacion.reportar("pepito","titulo poco descriptivo")
        publicacion.reportar("maria","titulo poco descriptivo")
        publicacion.reportar("rosa","titulo poco descriptivo")
        repositorio.actualizar(1, {"titulo":"vendo todo!"})
        expect(repositorio.buscarPorId(1).reportes.length).toBe(3)
    });
});
