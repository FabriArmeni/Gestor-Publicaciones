import Publicacion from "../src/Publicacion.js";
import RepositorioPublicaciones from "../src/RepositorioPublicaciones.js";

describe("Publicacion · reportes", () => {
    test("una publicación nueva no requiere revisión", () => {
        const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
        expect(publicacion.requiereRevision()).toBe(false);
    });

    test("con un solo reporte no alcanza el límite", () => {
        const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
        publicacion.reportar("bruno", "Contenido repetido");
        expect(publicacion.requiereRevision()).toBe(false);
    });

    test("un usuario no puede reportar dos veces la misma publicación", () => {
        const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
        publicacion.reportar("bruno", "Contenido repetido");
        expect(() => publicacion.reportar("bruno", "Otro motivo")).toThrow(
            "El usuario ya reportó esta publicación",
        );
    });

    test("con tres reportes de usuarios distintos requiere revisión", () => {
        const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
        publicacion.reportar("bruno", "motivo 1");
        publicacion.reportar("carla", "motivo 2");
        publicacion.reportar("dario", "motivo 3");
        expect(publicacion.requiereRevision()).toBe(true);
    });
});


describe("RepositorioPublicaciones · pendientesDeRevision", () => {
    test("devuelve sólo publicaciones activas que requieren revisión", () => {
        const repositorio = new RepositorioPublicaciones();
        const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
        publicacion.reportar("bruno", "motivo 1");
        publicacion.reportar("carla", "motivo 2");
        publicacion.reportar("dario", "motivo 3");
        repositorio.agregar(publicacion);
        expect(repositorio.pendientesDeRevision()).toEqual([publicacion]);
    });

    test("una publicación dada de baja queda excluida aunque requiera revisión", () => {
        const repositorio = new RepositorioPublicaciones();
        const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
        publicacion.reportar("bruno", "motivo 1");
        publicacion.reportar("carla", "motivo 2");
        publicacion.reportar("dario", "motivo 3");
        publicacion.darDeBaja();
        repositorio.agregar(publicacion);
        expect(repositorio.pendientesDeRevision()).toEqual([]);
    });

    test("sin reportes suficientes no hay publicaciones pendientes", () => {
        const repositorio = new RepositorioPublicaciones();
        const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
        publicacion.reportar("bruno", "motivo 1");
        repositorio.agregar(publicacion);
        expect(repositorio.pendientesDeRevision()).toEqual([]);
    });

    //Ej adicionales
    test("pendientesDeRevision() devuelve las publicaciones en el mismo orden en que fueron reportadas hasta cumplir el umbral", () => {
        const repositorio = new RepositorioPublicaciones();
        const publicacion1 = new Publicacion("Ana", "Apuntes de Redes", "...");
        const publicacion2 = new Publicacion("Ana", "Apuntes de Redes", "...");
        repositorio.agregar(publicacion1);
        repositorio.agregar(publicacion2);
        publicacion1.reportar("pepe", "Contenido inadecuado")
        publicacion1.reportar("juan", "Contenido inadecuado")
        publicacion1.reportar("jose", "Contenido inadecuado")
        publicacion2.reportar("pepe", "Contenido inadecuado")
        publicacion2.reportar("juan", "Contenido inadecuado")
        publicacion2.reportar("jose", "Contenido inadecuado")
        expect(repositorio.pendientesDeRevision()[0]).toBe(publicacion1)
        expect(repositorio.pendientesDeRevision()[1]).toBe(publicacion2)
    })
    
    test("quitarReporte(usuario) quita el reporte del usuario", () => {
        const repositorio = new RepositorioPublicaciones();
        const publicacion1 = new Publicacion("Ana", "Apuntes de Redes", "...");
        repositorio.agregar(publicacion1);
        publicacion1.reportar("pepe", "Contenido inadecuado")
        publicacion1.quitarReporte("pepe")
        expect(publicacion1.reportes).toEqual([])
    })
});
