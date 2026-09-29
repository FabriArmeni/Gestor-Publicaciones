import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import RepositorioPublicaciones from "../src/RepositorioPublicaciones";

test("una segunda instancia con la misma ruta recupera lo que la primera guardó", async () => {
    const carpeta = await mkdtemp(join(tmpdir(), "publicaciones-"));
    const ruta = join(carpeta, "datos.json");
    const a = new RepositorioPublicaciones(ruta);
    await a.cargar();
    const pub1 = await a.agregar("Apuntes de Redes", "descripcion de mas de 20 caracteres", "juan", "general");

    // PASO 9: crear una SEGUNDA instancia con la misma ruta, cargar(),
    // y verificar que b.listar() ya tiene la publicación que agregó `a`
    const b = new RepositorioPublicaciones(ruta);
    await b.cargar();
    const publicacionesB = b.listar();

    expect(publicacionesB).toHaveLength(1);
    expect(publicacionesB[0].id).toBe(pub1.id);
    expect(publicacionesB[0].titulo).toBe("Apuntes de Redes");
    expect(publicacionesB[0].descripcion).toBe("descripcion de mas de 20 caracteres");
    expect(publicacionesB[0].autor).toBe("juan");
    expect(publicacionesB[0].categoria).toBe("general");
});