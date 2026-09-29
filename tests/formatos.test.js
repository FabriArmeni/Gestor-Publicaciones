import {
    convertirAJSON,
    convertirAXML,
    convertirDesdeJSON,
    paraExponer,
    publicacionAXML,
} from "../src/formatos";
import RepositorioPublicaciones from "../src/RepositorioPublicaciones";

describe("formatos", () => {
    test("convertirDesdeJSON(convertirAJSON(publicaciones)) es igual a publicaciones mapeado en paraExponer()", () => {
        const repositorio = new RepositorioPublicaciones();
        repositorio.agregar(
            "Apuntes de Redes",
            "Contenido valido de mas de 20 caracteres",
            "Anabella",
        );
        repositorio.agregar(
            "Apuntes de Redes",
            "Contenido valido de mas de 20 caracteres",
            "Anabella",
        );
        const publicaciones = repositorio.listar();
        const conversion = convertirDesdeJSON(convertirAJSON(publicaciones));
        expect(conversion).toEqual(publicaciones.map(paraExponer));
    });

    test('Una publicación con autor "Ana & Cía" y título "Apuntes <avanzados>" debe producir un XML que contenga &amp; y &lt;, nunca el & o el < sin escapar.', () => {
        const repositorio = new RepositorioPublicaciones();
        repositorio.agregar(
            "Apuntes <avanzados>",
            "Contenido valido de mas de 20 caracteres",
            "Ana & Cía",
        );
        const publicacion = repositorio.buscarPorId(1);
        expect(publicacionAXML(publicacion)).toContain("&amp");
        expect(publicacionAXML(publicacion)).toContain("&lt");
        expect(publicacionAXML(publicacion)).toContain("&gt");
        expect(publicacionAXML(publicacion)).not.toContain("Ana & Cía");
        expect(publicacionAXML(publicacion)).not.toContain("<avanzados>");
    });
});

describe("Testing adicional", () => {    
    test("Ida y vuelta de JSON: convertirDesdeJSON(convertirAJSON(x)) debe ser igual a x (después de paraExponer)", () => {
        const repositorio = new RepositorioPublicaciones();
        repositorio.agregar(
            "Apuntes <avanzados>",
            "Contenido valido de mas de 20 caracteres",
            "Ana & Cía",
        );
        const publicaciones = repositorio.listar();
        const publiAJson = convertirAJSON(publicaciones);
        const jsonParseado = convertirDesdeJSON(publiAJson);
        const esperado = publicaciones.map(paraExponer);
        expect(jsonParseado).toEqual(esperado);
        expect(jsonParseado[0].mostrarResumen).toBeUndefined();
    });

    test("Colección vacía: convertirAJSON([]) da '[]' y convertirAXML([]) da '<publicaciones></publicaciones>' sin hijos", () => {
        const xml = '<?xml version="1.0" encoding="UTF-8"?><publicaciones></publicaciones>';
        expect(convertirAXML([])).toBe(xml);
        expect(convertirAJSON([])).toBe("[]");
    });

    test("Caracteres reservados en XML: un autor con &, <, > o comillas no debe romper la estructura", () => {
        const repositorio = new RepositorioPublicaciones();
        repositorio.agregar(`< 'compro' & "vendo" >`, "Contenido valido de mas de 20 caracteres", "juancito", "compraventa")
        const xml = convertirAXML(repositorio.listar());
        expect(xml).toContain("&amp;");
        expect(xml).toContain("&lt;");
        expect(xml).toContain("&gt;");
        expect(xml).toContain("&quot;");
        expect(xml).toContain("&apos;");
        expect(xml).not.toContain(`< 'compro' & "vendo" >`);
    });
});
