// server/routes/pdfRoutes.js
import { Router } from "express";
import multer, { memoryStorage } from "multer";
import { mergePdfs } from "../controllers/pdfController.js";

const router = Router();
const storage = memoryStorage();
const upload = multer({ storage: storage });

router.post("/pdfMerger", upload.array("pdfFiles"), mergePdfs);

export default router;
