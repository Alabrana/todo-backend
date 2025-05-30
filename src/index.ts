import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Ejecutando el servidor de Express");
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
