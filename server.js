import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import RepositorioPublicaciones from "./src/RepositorioPublicaciones.js";
import crearRouterPublicaciones from "./routes/publicaciones.routes.js";
import { paraExponer, convertirAXML } from "./src/formatos.js";

const publicaciones = [
    {
        titulo: "Vendo apuntes",
        descripcion: "apuntes de mateeeeeeeeee",
        autor: { nombre: "martin", email: "mar@tin.com" },
        precio: 2000,
    },
    {
        titulo: "Vendo libro",
        descripcion: "libro de anatomiaaaaaaaaaaa",
        autor: { nombre: "fabricio", email: "fabri@cio.com" },
        precio: 2000,
    },
    {
        titulo: "Clase consulta",
        descripcion: "antes del examennnnnnnnnnnn",
        autor: { nombre: "santiago", email: "santi@alejo.com" },
        modalidad: "presencial",
        duracionMinutos: 120,
        cliente: { nombre: "fabricio", email: "fabri@cio.com" },
    },
    {
        titulo: "Dibujo caratula",
        descripcion: "para cada materiaaaaaaaaaaaa",
        autor: { nombre: "juan", email: "juan@juan.com" },
        modalidad: "presencial",
        duracionMinutos: 120,
        cliente: { nombre: "martin", email: "mar@tin.com" },
    },
];

function esperar(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const repositorio = new RepositorioPublicaciones();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/src", express.static(path.join(__dirname, "src")));

// Rutas
app.get("/datos/publicaciones.json", (req, res) => {
    // PASO 4A: res.json(...) — Express arma el Content-Type application/json solo
    const publicaciones = repositorio.listar().map(paraExponer)
    res.json(publicaciones)
});

app.get("/datos/publicaciones.xml", (req, res) => {
    // PASO 4B: res.type("application/xml").send(...)
    const publicaciones = repositorio.listar().map(paraExponer)
    res.type("xml").send(convertirAXML(publicaciones))
});

// PASO 5C: montar el router, pasándole la MISMA instancia de repositorio
// que ya usan /estado-comunidad y /estado-inactivas
app.use("/publicaciones", crearRouterPublicaciones(repositorio));

app.get("/estado-comunidad", async (req, res) => {
    await esperar(900); // para simular delay y que se vea el "Consultando...""
    res.send(repositorio.obtenerEstado());
});

app.get("/estado-inactivas", async (req, res) => {
    await esperar(900);
    res.send(repositorio.obtenerEstadoInactivas());
});

// app.get("/api/publicaciones", async (req, res) => {
//     await esperar(900);
//     if (req.query.error === "1")
//         return res
//             .status(500)
//             .json({ mensaje: "No pudimos consultar las publicaciones" });
//     res.json(publicaciones);
// });

app.listen(3000, () =>
    console.log("Repositorio publicaciones en http://localhost:3000"),
);
