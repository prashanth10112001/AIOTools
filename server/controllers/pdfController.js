// server/controllers/pdfController.js
import { PDFDocument } from "pdf-lib";

export async function mergePdfs(req, res) {
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
    console.error("Error merging PDFs (controller):", error);
    res.status(500).send("An error occurred while merging PDFs (controller).");
  }
}
