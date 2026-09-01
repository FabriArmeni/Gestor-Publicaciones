import express from "express";

const app = express();
app.use(express.static("public"));
app.listen(3000, () => console.log("Repositorio publicaciones en http://localhost:3000"));
