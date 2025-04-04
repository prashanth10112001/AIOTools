// client/src/components/ToolInterface.jsx
import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import "../styles/PdfMerger.css";

function PdfMergerTool() {
  const [fileNames, setFileNames] = useState("No files chosen");
  const [pdfFiles, setPdfFiles] = useState([]);

  const handleFileChange = (event) => {
    setPdfFiles(Array.from(event.target.files));
  };

  const mergePdfsServer = async () => {
    if (pdfFiles.length < 2) {
      alert("Please select at least two PDF files.");
      return;
    }

    const formData = new FormData();
    pdfFiles.forEach((file, index) => {
      formData.append(`pdfFiles`, file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/pdfMerger",
        formData,
        {
          responseType: "blob", // Important for handling binary data
        }
      );
      saveAs(response.data, "merged.pdf");
    } catch (error) {
      console.error("Error merging PDFs (server):", error);
      alert("An error occurred while merging PDFs (server).");
    }
  };

  useEffect(() => {
    const fileInput = document.getElementById("file-upload");

    if (fileInput) {
      fileInput.addEventListener("change", async (event) => {
        const files = event.target.files;

        if (files && files.length > 0) {
          const names =
            files.length > 3
              ? Array.from(files)
                  .slice(0, 3)
                  .map((file) => file.name)
                  .join(", ") +
                " and " +
                (files.length - 3) +
                " more files"
              : Array.from(files)
                  .map((file) => file.name)
                  .join(", ");
          setFileNames(names);
        } else {
          setFileNames("No files chosen");
        }
      });
    } else {
      console.error("Element with ID 'file-upload' not found.");
    }
  }, []);

  return (
    <>
      <div className="pdfMergerBox">
        <div className="pdfMergerBorder">
          <div className="pdfMergerTitle">
            <p>Please select the .pdf files to merge ...</p>
          </div>

          <div className="pdfMergerInput">
            <label htmlFor="file-upload">Choose File</label>
            <input
              type="file"
              id="file-upload"
              multiple
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <span className="file-name">{fileNames}</span>
            <button onClick={mergePdfsServer}>Merge PDFs</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdfMergerTool;
