// tests/repositorioPublicaciones.test.js
import RepositorioPublicaciones from "../src/RepositorioPublicaciones.js";

describe("RepositorioPublicaciones · CRUD", () => {
  let repositorio;

  const autorValido = "Martin";
  const tituloValido = "Titulo de Prueba";
  const descripcionValida = "Esta es una descripcion lo suficientemente larga que supera los 20 caracteres";
  const categoriaValida = "general";

  beforeEach(() => {
    repositorio = new RepositorioPublicaciones();
  });

  test("PASO 6A: agregar asigna ids crecientes a partir de 1", () => {
    const pub1 = repositorio.agregar(autorValido, tituloValido, descripcionValida, categoriaValida);
    const pub2 = repositorio.agregar(autorValido, tituloValido, descripcionValida, categoriaValida);

    expect(pub1.id).toBe(1);
    expect(pub2.id).toBe(2);
  });

  test("PASO 6B: listar devuelve una copia: modificarla no afecta al repositorio", () => {
    repositorio.agregar(autorValido, tituloValido, descripcionValida, categoriaValida);
    const copia = repositorio.listar();

    copia.pop();

    expect(copia.length).toBe(0);
    expect(repositorio.listar().length).toBe(1);
  });

  test("PASO 6C: actualizar revalida datos y conserva el ID", () => {
    const pub = repositorio.agregar(autorValido, "Titulo Viejo", descripcionValida, categoriaValida);
    const actualizada = repositorio.actualizar(pub.id, { titulo: "Nuevo Titulo" });

    expect(actualizada.id).toBe(pub.id);
    expect(actualizada.titulo).toBe("Nuevo Titulo");
    expect(actualizada.autor).toBe(autorValido);
  });

  test("PASO 6D: eliminar una publicación inexistente devuelve false", () => {
    const resultado = repositorio.eliminar(999);
    expect(resultado).toBe(false);
  });

  test("buscarPorId funciona tanto con número como con string", () => {
    repositorio.agregar(autorValido, tituloValido, descripcionValida, categoriaValida);

    expect(repositorio.buscarPorId(1)).not.toBeNull();
    expect(repositorio.buscarPorId("1")).not.toBeNull();
  });
});