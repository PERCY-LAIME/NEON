require("dotenv").config();
const { neon } = require("@neondatabase/serverless");
const express = require("express");

const app = express();
const port = 3000;

// Verificar que la variable DATABASE_URL esté definida
if (!process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL no está definida en el archivo .env");
  process.exit(1);
}

// Depuración: imprimir la URL para verificar que se cargó bien
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Conectar a la base de datos
const sql = neon(process.env.DATABASE_URL);

app.get("/", async (req, res) => {
  try {
    const result = await sql`SELECT * FROM playing_with_neon`;
    res.send(result)
  } catch (err) {
    console.error("Error al consultar la base de datos:", err);
    res.status(500).send("Error en la conexión");
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
