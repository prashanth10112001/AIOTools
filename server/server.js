// server/server.js
import express from "express";
import multer, { memoryStorage } from "multer";
import { PDFDocument } from "pdf-lib";
import cors from "cors";
const app = express();
const port = 5000;

app.use(cors());

const storage = memoryStorage();
const upload = multer({ storage: storage });

app.post("/pdfMerger", upload.array("pdfFiles"), async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).send("Please provide at least two PDF files.");
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of req.files) {
      const pdfDoc = await PDFDocument.load(file.buffer);
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();

    res.contentType("application/pdf");
    res.send(mergedPdfBytes);
  } catch (error) {
    console.error("Error merging PDFs (server):", error);
    res.status(500).send("An error occurred while merging PDFs (server).");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
