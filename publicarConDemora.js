export async function publicarConDemora(publicacion, callback) {
    console.log("Procesando publicación...");
    
    setTimeout(() => {
        callback(publicacion)
    }, 2000)
}