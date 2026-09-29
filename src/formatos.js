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
