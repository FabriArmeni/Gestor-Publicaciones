import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import RepositorioPublicaciones from "./src/RepositorioPublicaciones.js";
import crearRouterPublicaciones from "./routes/publicaciones.routes.js";
import { paraExponer, convertirAXML } from "./src/formatos.js"

const __dirname = path.dirname(fileURLtoPath(import.meta.url));
const RUTA_DATOS = path.join(__dirname, "data", "publicaciones.json");

const repositorio = new RepositorioPublicaciones(RUTA_DATOS);
await repositorio.cargar();

const app = express();

//Middlewares
app.use(express.json()); //NECESARIO: Procesa JSON en los POST/PUT
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/src", express.static(path.join(__dirname, "src")));

app.use("/publicaciones", crearRouterPublicaciones(repositorio));

//Endpoints
app.get("/datos/publicaciones.json", (req, res) => {
    const publicas = repositorio.listar().map(paraExponer);
    res.json(publicas);
});

app.get("/datos/publicaciones.xml", (req, res) => {
    const xmlText = convertirAXML(repositorio.listar());
    res.type("application/xml").send(xmlText);
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000")
});