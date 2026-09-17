// import { Publicacion } from "../src/Publicacion.js";

import Publicacion from "../public/src/Publicacion";

describe("Publicacion", () => {
    test("una publicación nueva comienza activa y sin etiquetas", () => {
        const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
        expect(publicacion.activa).toBe(true);
        expect(publicacion.etiquetas).toEqual([]);
    });
    test("agregarEtiqueta incorpora una etiqueta normalizada", () => {
        const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
        publicacion.agregarEtiqueta(" redes ");
        expect(publicacion.etiquetas).toEqual(["redes"]);
    });
    test("darDeBaja cambia activa a false", () => {
        const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
        publicacion.darDeBaja();
        expect(publicacion.activa).toBe(false);
    });
});
