import Publicacion, { CATEGORIAS_PERMITIDAS } from "../src/Publicacion.js";

describe("validaciones en el servidor al crear una publicacion", () => {
    // Titulo -----------------------------
    // casos fuera de los limites
    test.each([
        ["1234", "corto"],
        ["a".repeat(81), "largo"],
    ])("un título %s (%s) lanza el error esperado", (titulo) => {
        expect(
            () =>
                new Publicacion(
                    titulo,
                    "Contenido válido de más de veinte caracteres.",
                    "Ana",
                ),
        ).toThrow("El título debe tener entre 5 y 80 caracteres");
    });

    // casos dentro
    test.each([
        ["12345", "12345"], // 5 caracteres
        ["   12345   ", "12345"], // 5 caracteres + espacios
        ["a".repeat(80), "a".repeat(80)], // 80 caracteres
        [`   ${"a".repeat(80)}   `, "a".repeat(80)], // 80 caracteres + espacios
    ])(
        "un titulo %s es valido por estar dentro del rango",
        (titulo, resultado) => {
            const publi = new Publicacion(
                titulo,
                "Contenido valido de mas de 20 caracteres",
                "josé",
            );
            expect(publi.titulo).toBe(resultado);
        },
    );

    // Descripcion -----------------------------
    // casos fuera de los limites
    test.each([
        ["1".repeat(19), "corta"],
        ["1".repeat(501), "larga"],
    ])("una descripcion %s (%s) lanza el error esperado", (descripcion) => {
        expect(
            () =>
                new Publicacion("Titulo de la publicacion", descripcion, "Ana"),
        ).toThrow("La descripcion debe tener entre 20 y 500 caracteres");
    });

    // casos dentro
    test.each([
        ["1".repeat(20), "1".repeat(20)], // 20 caracteres
        [`   ${"1".repeat(20)}   `, "1".repeat(20)], // 20 caracteres + espacios
        ["1".repeat(500), "1".repeat(500)], // 500 caracteres
        [`   ${"1".repeat(500)}   `, "1".repeat(500)], // 500 caracteres + espacios
    ])(
        "una descripcion %s es valida por estar dentro del rango",
        (descripcion, resultado) => {
            const publi = new Publicacion(
                "Titulo de la publicacion",
                descripcion,
                "josé",
            );
            expect(publi.descripcion).toBe(resultado);
        },
    );

    // Autor -----------------------------
    // casos fuera de los limites
    test.each([
        ["", "vacio"],
        ["         ", "solo espacios"],
    ])("un autor %s (%s) lanza el error esperado", (autor) => {
        expect(
            () =>
                new Publicacion(
                    "Titulo de la publicacion",
                    "Contenido válido de más de veinte caracteres.",
                    autor,
                ),
        ).toThrow("El autor es obligatorio");
    });

    // casos dentro
    test.each([
        ["autor", "autor"],
        ["        autor      ", "autor"],
    ])(
        "un autor %s es valido por no ser solo espacios ni vacio",
        (autor, resultado) => {
            const publi = new Publicacion(
                "Titulo de la publicacion",
                "Contenido válido de más de veinte caracteres.",
                autor,
            );
            expect(publi.autor).toBe(resultado);
        },
    );

    // // Categoria -----------------------------
    // casos fuera de los limites
    test(`una categoria distinta de ${CATEGORIAS_PERMITIDAS.join(", ")} da error`, () => {
        expect(
            () =>
                new Publicacion(
                    "Titulo de la publicacion",
                    "Contenido válido de más de veinte caracteres.",
                    "autor",
                    "categoria invalida",
                ),
        ).toThrow(
            `La categoría debe ser una de: ${CATEGORIAS_PERMITIDAS.join(", ")}`,
        );
    });

    // // casos dentro
    test.each([["general"], ["aviso"], ["evento"], ["compraventa"]])(
        `La categoría es valida si es una de: ${CATEGORIAS_PERMITIDAS.join(", ")}`,
        (categoria) => {
            const publi = new Publicacion(
                "Titulo de la publicacion",
                "Contenido válido de más de veinte caracteres.",
                "autor",
                categoria,
            );
            expect(publi.categoria).toBe(categoria);
        },
    );
    test("si no se ingresa la categoria es general por defecto", () => {
        const publi = new Publicacion(
            "Titulo de la publicacion",
            "Contenido válido de más de veinte caracteres.",
            "autor",
        );
        expect(publi.categoria).toBe("general");
    });
});
