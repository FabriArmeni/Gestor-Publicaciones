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
    return JSON.stringify(publicaciones.map(paraExponer));
}
export function convertirDesdeJSON(texto) {
    // PASO 2B: JSON.parse
    return JSON.parse(texto);
}

function escaparXML(valor) {
    // PASO 3A: reemplazar &, <, >, " y ' por sus entidades
    // (&amp; &lt; &gt; &quot; &apos;), en ese orden
    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

export function publicacionAXML(publicacion) {
    // PASO 3B: construir
    // <publicacion id="..."><autor>...</autor>...<etiquetas>...</etiquetas></publicacion>
    // usando escaparXML en cada valor de texto
    const id = escaparXML(publicacion.id);
    const titulo = escaparXML(publicacion.titulo);
    const descripcion = escaparXML(publicacion.descripcion);
    const autor = escaparXML(publicacion.autor);
    const categoria = escaparXML(publicacion.categoria);
    const etiquetas =
        publicacion.etiquetas.length > 0
            ? publicacion.etiquetas
                  .map((etiq) => `<etiqueta>${escaparXML(etiq)}</etiqueta>`)
                  .join("")
            : "";

    return (
        `<publicacion id="${id}">` +
        `<titulo>${titulo}</titulo>` +
        `<descripcion>${descripcion}</descripcion>` +
        `<autor>${autor}</autor>` +
        `<categoria>${categoria}</categoria>` +
        `<etiquetas>${etiquetas}</etiquetas>` +
        `</publicacion>`
    );
}
export function convertirAXML(publicaciones) {
    // PASO 3C: envolver todos los <publicacion> dentro de <publicaciones>
    // sin olvidar el encabezado <?xml version="1.0" encoding="UTF-8"?>
    const publicacionesAXML = publicaciones.map(publicacionAXML).join("");
    return `
    <?xml version="1.0" encoding="UTF-8"?>
    <publicaciones>
        ${publicacionesAXML}
    </publicaciones>
    `;
}
