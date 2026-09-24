import Publicacion from "../src/Publicacion";

describe("Publicacion", () => {
    test("una publicación nueva comienza activa y sin etiquetas", () => {
        const publicacion = new Publicacion("Apuntes de Redes", "Contenido valido de mas de 20 caracteres", "Anabella");
        expect(publicacion.activa).toBe(true);
        expect(publicacion.etiquetas).toEqual([]);
    });
    test("agregarEtiqueta incorpora una etiqueta normalizada", () => {
        const publicacion = new Publicacion("Apuntes de Redes", "Contenido valido de mas de 20 caracteres", "Anabella");
        publicacion.agregarEtiqueta(" redes ");
        expect(publicacion.etiquetas).toEqual(["redes"]);
    });
    test("darDeBaja cambia activa a false", () => {
        const publicacion = new Publicacion("Apuntes de Redes", "Contenido valido de mas de 20 caracteres", "Anabella");
        publicacion.darDeBaja();
        expect(publicacion.activa).toBe(false);
    });

    // etiquetas
    test("una etiqueta repetida no se agrega dos veces", () => {
        const publicacion = new Publicacion("Apuntes de Redes", "Contenido valido de mas de 20 caracteres", "Anabella");
        publicacion.agregarEtiqueta("redes");
        publicacion.agregarEtiqueta("redes");
        expect(publicacion.etiquetas).toEqual(["redes"]);
    });
    test("una etiqueta vacía lanza el error esperado", () => {
        const publicacion = new Publicacion("Apuntes de Redes", "Contenido valido de mas de 20 caracteres", "Anabella");
        expect(() => publicacion.agregarEtiqueta(" ")).toThrow("Etiqueta inválida");
    });
    test("tieneEtiqueta ignora mayúsculas y minúsculas", () => {
        const publicacion = new Publicacion("Apuntes de Redes", "Contenido valido de mas de 20 caracteres", "Anabella");
        publicacion.agregarEtiqueta("Redes");
        expect(publicacion.tieneEtiqueta("redes")).toBe(true);
    });
});
