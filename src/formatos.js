export function paraExponer(publicacion) {
    return {
        id: publicacion.id,
        titulo: publicacion.titulo,
        descripcion: publicacion.descripcion,
        categoria: publicacion.categoria,
        activa: publicacion.activa,
        etiquetas: publicacion.etiquetas,
        estado: publicacion.estado,
    };
}

export function convertirAJSON(publicaciones) {
 // PASO 2A: publicaciones.map(paraExponer) y JSON.stringify
 return JSON.stringify(publicaciones.map(paraExponer))
}
export function convertirDesdeJSON(texto) {
 // PASO 2B: JSON.parse
 return JSON.parse(texto)
}