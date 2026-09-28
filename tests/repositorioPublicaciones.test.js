// tests/repositorioPublicaciones.test.js
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import RepositorioPublicaciones from "../src/RepositorioPublicaciones.js";

describe("RepositorioPublicaciones · CRUD y Persistencia", () => {
  let repositorio;
  let rutaArchivo;

  const autorValido = "Martin";
  const tituloValido = "Titulo de Prueba";
  const descripcionValida = "Esta es una descripcion lo suficientemente larga que supera los 20 caracteres";
  const categoriaValida = "general";

  beforeEach(async () => {
    // Carpeta temporal aislada para cada prueba
    const carpetaTemp = await mkdtemp(join(tmpdir(), "pub-test-"));
    rutaArchivo = join(carpetaTemp, "publicaciones.json");
    
    repositorio = new RepositorioPublicaciones(rutaArchivo);
    await repositorio.cargar();
  });

  test("PASO 6A: agregar asigna ids crecientes a partir de 1", async () => {
    const pub1 = await repositorio.agregar(autorValido, tituloValido, descripcionValida, categoriaValida);
    const pub2 = await repositorio.agregar(autorValido, tituloValido, descripcionValida, categoriaValida);

    expect(pub1.id).toBe(1);
    expect(pub2.id).toBe(2);
  });

  test("PASO 6B: listar devuelve una copia: modificarla no afecta al repositorio", async () => {
    await repositorio.agregar(autorValido, tituloValido, descripcionValida, categoriaValida);
    const copia = repositorio.listar();

    copia.pop();

    expect(copia.length).toBe(0);
    expect(repositorio.listar().length).toBe(1);
  });

  test("PASO 6C: actualizar revalida datos y conserva el ID", async () => {
    const pub = await repositorio.agregar(autorValido, "Titulo Viejo", descripcionValida, categoriaValida);
    const actualizada = await repositorio.actualizar(pub.id, { titulo: "Nuevo Titulo" });

    expect(actualizada.id).toBe(pub.id);
    expect(actualizada.titulo).toBe("Nuevo Titulo");
    expect(actualizada.autor).toBe(autorValido);
  });

  test("PASO 6D: eliminar una publicación inexistente devuelve false", async () => {
    const resultado = await repositorio.eliminar(999);
    expect(resultado).toBe(false);
  });

  test("buscarPorId funciona tanto con número como con string", async () => {
    await repositorio.agregar(autorValido, tituloValido, descripcionValida, categoriaValida);

    expect(repositorio.buscarPorId(1)).not.toBeNull();
    expect(repositorio.buscarPorId("1")).not.toBeNull();
  });
});