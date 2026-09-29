import { convertirAJSON, convertirAXML, convertirDesdeJSON, paraExponer, publicacionAXML } from "../src/formatos"
import RepositorioPublicaciones from "../src/RepositorioPublicaciones"

describe("formatos", () => {
    test("convertirDesdeJSON(convertirAJSON(publicaciones)) es igual a publicaciones mapeado en paraExponer()", () => {
        const repositorio = new RepositorioPublicaciones()
        repositorio.agregar("Apuntes de Redes", "Contenido valido de mas de 20 caracteres", "Anabella");
        repositorio.agregar("Apuntes de Redes", "Contenido valido de mas de 20 caracteres", "Anabella");
        const publicaciones = repositorio.listar()
        const conversion = convertirDesdeJSON(convertirAJSON(publicaciones))
        expect(conversion).toEqual(publicaciones.map(paraExponer))
    })
    
    test('Una publicación con autor "Ana & Cía" y título "Apuntes <avanzados>" debe producir un XML que contenga &amp; y &lt;, nunca el & o el < sin escapar.', () => {
        const repositorio = new RepositorioPublicaciones()
        repositorio.agregar("Apuntes <avanzados>", "Contenido valido de mas de 20 caracteres", "Ana & Cía");
        const publicacion = repositorio.buscarPorId(1)
        expect(publicacionAXML(publicacion)).toContain("&amp")
        expect(publicacionAXML(publicacion)).toContain("&lt")
        expect(publicacionAXML(publicacion)).toContain("&gt")
        expect(publicacionAXML(publicacion)).not.toContain("Ana & Cía")
        expect(publicacionAXML(publicacion)).not.toContain("<avanzados>")
    })
})