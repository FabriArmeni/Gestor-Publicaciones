import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import RepositorioPublicaciones from "./src/RepositorioPublicaciones.js";
import Publicacion from "./src/Publicacion.js";
import crearRouterPublicaciones from "./routes/publicaciones.routes.js";

function esperar(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const repositorio = new RepositorioPublicaciones();

const app = express();
const __dirname = path.dirname(fileURLtoPath(import.meta.url));

//Middlewares
app.use(express.json()); //NECESARIO: Procesa JSON en los POST/PUT
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/src", express.static(path.join(__dirname, "src")));

app.use("/publicaciones", crearRouterPublicaciones(repositorio));

app.get("/estado-comunidad", async (req, res) => {
    await esperar(900);
    res.send(repositorio.obtenerEstado());
});

app.get("/estado-inactivas", async (req, res) => {
    await esperar(900);
    res.send(repositorio.obtenerEstadoInactivas());
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
});