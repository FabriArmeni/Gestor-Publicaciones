import RepositorioPublicaciones from "../src/RepositorioPublicaciones.js";
import Publicacion from "../src/Publicacion.js";
import PublicacionVenta from "../src/PublicacionVenta.js";
import PublicacionServicio from "../src/PublicacionServicio.js";

describe("RepositorioPublicaciones", () => {
    test("buscarPorEtiqueta devuelve coincidencias activas", () => {
        const repositorio = new RepositorioPublicaciones();
        const publicacion = new Publicacion("Apuntes de Redes", "Contenido valido de mas de 20 caracteres", "Anabella");
        publicacion.agregarEtiqueta("redes");
        repositorio.agregar(publicacion);
        expect(repositorio.buscarPorEtiqueta("redes")).toEqual([publicacion]);
    });
    test("una publicación dada de baja queda excluida", () => {
        const repositorio = new RepositorioPublicaciones();
        const publicacion = new Publicacion("Apuntes de Redes", "Contenido valido de mas de 20 caracteres", "Anabella");
        publicacion.agregarEtiqueta("redes");
        publicacion.darDeBaja();
        repositorio.agregar(publicacion);
        expect(repositorio.buscarPorEtiqueta("redes")).toEqual([]);
    });
    test("una etiqueta inexistente devuelve un arreglo vacío", () => {
        const repositorio = new RepositorioPublicaciones();
        expect(repositorio.buscarPorEtiqueta("inexistente")).toEqual([]);
    });

    // parte 7
    test("cada subclase arma su propio resumen", () => {
        const venta = new PublicacionVenta("Calculadora", "Contenido valido de mas de 20 caracteres", "Anabella", 5000);
        const servicio = new PublicacionServicio(
            "Clases de Álgebra",
            "Contenido valido de mas de 20 caracteres",
            "Luis",
            "presencial",
            120,
            { nombre: "juan", email: "juan@gmail.com" },
        );
        expect(venta.mostrarResumen()).toContain("5000");
        expect(servicio.mostrarResumen()).toContain("Clases de Álgebra");
    });
});
