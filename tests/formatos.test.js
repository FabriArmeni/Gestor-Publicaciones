import { convertirAJSON, convertirDesdeJSON, paraExponer } from "../src/formatos"
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
})