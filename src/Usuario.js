class Usuario {
    constructor(nombre, email) {
        this.nombre = nombre
        this.email = email
        this.fechaRegistro = new Date()
        this.contactos = [] // array Usuario
    }
    mostrarPerfil(){
        return `Nombre: ${this.nombre} Email: ${this.email}`
    }
    agregarContacto(otroUsuario){
        this.contactos.push(otroUsuario)
    }
}

export default Usuario