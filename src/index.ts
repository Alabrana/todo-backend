import express from "express";
import { sequelize } from "./db/sequelize.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/", (_req, res) => {
  res.send("Ejecutando el servidor de Express");
});

// 🔧 Sync DB
sequelize.sync().then(() => {
  console.log("Database sync");
  app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });
});
