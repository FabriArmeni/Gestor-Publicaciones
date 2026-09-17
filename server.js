import express from "express";

const app = express();
app.use(express.static("public"));

const publicaciones = [
    {
        titulo: "Vendo apuntes",
        descripcion: "apuntes de mate",
        autor: { nombre: "martin", email: "mar@tin.com" },
        precio: 2000,
    },
    {
        titulo: "Vendo libro",
        descripcion: "libro de anatomia",
        autor: { nombre: "fabricio", email: "fabri@cio.com" },
        precio: 2000,
    },
    {
        titulo: "Clase consulta",
        descripcion: "antes del examen",
        autor: { nombre: "santiago", email: "santi@alejo.com" },
        modalidad: "presencial",
        duracionMinutos: 120,
        cliente: { nombre: "fabricio", email: "fabri@cio.com" },
    },
    {
        titulo: "Dibujo caratula",
        descripcion: "para cada materia",
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

app.get("/api/publicaciones", async (req, res) => {
    // await new Promise((r) => setTimeout(r, 900));
    await esperar(900);
    if (req.query.error === "1")
        return res
            .status(500)
            .json({ mensaje: "No pudimos consultar las publicaciones" });
    res.json(publicaciones);
});

app.listen(3000, () =>
    console.log("Repositorio publicaciones en http://localhost:3000"),
);
