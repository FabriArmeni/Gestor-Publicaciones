export function publicarConDemora(publicacion, callback) {
    console.log("Procesando publicación...");
    
    setTimeout(() => {
        callback(publicacion)
    }, 2000)
}

export async function publicarConDemorAsync(publicacion, callback) {
    console.log("Procesando publicación...");
    return new Promise(() => {
        setTimeout(() => {
            callback(publicacion)
        }, 2000)

    })
}