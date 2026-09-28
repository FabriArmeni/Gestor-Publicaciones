export function paraExponer(publicacion) {
    return {
        id: publicacion.id,
        autor: publicacion.autor,
        titulo: publicacion.titulo,
        descripcion: publicacion.descripcion,
        categoria: publicacion.categoria,
        activa: publicacion.activa ?? true,
        etiquetas: publicacion.etiquetas ?? [],
        estado: publicacion.estado ?? "publicado"
    };
}

export function convertirAJSON(publicaciones) {
    return JSON.stringify(publicaciones.map(paraExponer));
}

export function convertirDesdeJSON(texto) {
    return JSON.parse(texto);
}