// server/server.js
import express, { json } from "express";
import cors from "cors";
import pdfRoutes from "./routes/pdfRoutes.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(json()); // Add json middleware.

app.use("/", pdfRoutes); // Use the pdfRoutes for all routes.

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
