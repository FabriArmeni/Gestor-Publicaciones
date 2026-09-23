import GestorNotificaciones from "../src/GestorNotificaciones.js";
import NotificadorWeb from "../src/NotificadorWeb.js";
import NotificadorEmail from "../src/NotificadorEmail.js";
import NotificadorConsola from "../src/NotificadorConsola.js";

describe("Notificaciones", () => {

    test.each([
        [new NotificadorWeb(), "Notificación web: Tu publicación fue aprobada"],
        [new NotificadorEmail(), "Email enviado: Tu publicación fue aprobada"],
        [new NotificadorConsola(), "Consola: Tu publicación fue aprobada"],
    ])("cada canal notifica según su propio formato", (notificador, esperado) => {
        const gestor = new GestorNotificaciones();
        expect(gestor.enviar(notificador, "Tu publicación fue aprobada")).toBe(
            esperado,
        );
    });
    
    test("notificar() con un mensaje vacío", () => {
        const gestor = new GestorNotificaciones();
        const notificador = new NotificadorConsola()
        expect(gestor.enviar(notificador, "")).toBe("Consola: ")
        // Regla faltante: tendria que haber una validacion para cuando el mensaje sea vacio lanzar error
    })
})