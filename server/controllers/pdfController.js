// server/controllers/pdfController.js
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";

export async function mergePdfs(req, res) {
  try {
    if (!Array.isArray(req.files) || req.files.length < 2) {
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

export async function imageCompressor(req, res) {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const quality = parseInt(req.body.quality, 10) || 60;
  const originalFilename = req.file.originalname;
  const fileExtension = extname(originalFilename).toLowerCase();

  try {
    let compressedImageBuffer;
    let mimeType;

    if (
      [".jpg", ".jpeg", ".png", ".webp", ".tiff", ".heic", ".cr2"].includes(
        fileExtension
      )
    ) {
      if (fileExtension === ".cr2") {
        // Pass through CR2:
        compressedImageBuffer = req.file.buffer;
        mimeType = "image/x-canon-cr2"; // Correct MIME type for CR2
      } else if (fileExtension === ".heic") {
        compressedImageBuffer = req.file.buffer;
        mimeType = req.file.mimetype;
      } else {
        compressedImageBuffer = await sharp(req.file.buffer).toBuffer();
        mimeType = req.file.mimetype;
      }

      if ([".jpg", ".jpeg"].includes(fileExtension)) {
        compressedImageBuffer = await sharp(req.file.buffer)
          .jpeg({ quality: quality })
          .toBuffer();
        mimeType = "image/jpeg";
      } else if (fileExtension === ".png") {
        compressedImageBuffer = await sharp(req.file.buffer)
          .png({ quality: quality })
          .toBuffer();
        mimeType = "image/png";
      } else if (fileExtension === ".webp") {
        compressedImageBuffer = await sharp(req.file.buffer)
          .webp({ quality: quality })
          .toBuffer();
        mimeType = "image/webp";
      }

      const filename = `${uuidv4()}${fileExtension}`;

      res.set({
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      });
      res.send(compressedImageBuffer);
    } else {
      res.status(400).send("Unsupported image format.");
    }
  } catch (error) {
    console.error("Error compressing image:", error);
    res.status(500).send("Error compressing image.");
  }
}
