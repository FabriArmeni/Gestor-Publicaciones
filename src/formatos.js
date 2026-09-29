export function paraExponer(publicacion) {
    return {
        id: publicacion.id,
        titulo: publicacion.titulo,
        descripcion: publicacion.descripcion,
        autor: publicacion.autor,
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

function escaparXML(valor) {
    if (valor === null || valor === undefined) return "";
    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function publicacionAXML(publicacion) {
    const exp = paraExponer(publicacion);
    return` <publicacion id="${escaparXML(exp.id)}">
    <titulo>${escaparXML(exp.titulo)}</titulo>
    <descripcion>${escaparXML(exp.descripcion)}</descripcion>
    <autor>${escaparXML(exp.autor)}</autor>
    <categoria>${escaparXML(exp.categoria)}</categoria>
    </publicacion>`;
}

export function convertirAXML(publicaciones) {
    const itemsXML = publicaciones.map(publicacionAXML).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<publicaciones>\n${itemsXML}\n</publicaciones>`;
}