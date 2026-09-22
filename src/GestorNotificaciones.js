export default class GestorNotificaciones {
    enviar(notificador, mensaje) {
        return notificador.notificar(mensaje);
    }
}
