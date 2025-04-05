// server/routes/pdfRoutes.js
import { Router } from "express";
import { memoryStorage } from "multer";
import { mergePdfs, imageCompressor } from "../controllers/pdfController.js";
import multer from "multer";

const router = Router();
const storage = memoryStorage();
const upload = multer({ storage: storage });

router.post("/pdfMerger", upload.array("pdfFiles"), mergePdfs);
router.post("/imageCompressor", upload.single("image"), imageCompressor);
export default router;
