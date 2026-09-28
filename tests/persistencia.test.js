// tests/persistencia.test.js
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import RepositorioPublicaciones from "../src/RepositorioPublicaciones.js";

const CONTENIDO_VALIDO = "Esta es una descripcion valida de mas de 20 caracteres";

test("una segunda instancia con la misma ruta recupera lo que la primera guardo", async () => {
  const carpeta = await mkdtemp(join(tmpdir(), "publicaciones-"));
  const ruta = join(carpeta, "datos.json");

  const a = new RepositorioPublicaciones(ruta);
  await a.cargar();
  await a.agregar("Ana", "Apuntes de Redes", CONTENIDO_VALIDO, "general");

  const b = new RepositorioPublicaciones(ruta);
  await b.cargar();

  expect(b.listar().length).toBe(1);
  expect(b.listar()[0].autor).toBe("Ana");
});