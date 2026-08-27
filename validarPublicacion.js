export function validarPublicacion(publicacion, reglas) {
    let esValida = true
    if (publicacion.titulo.length < reglas.longitudMin) {
        esValida = false
    }
    return esValida
}