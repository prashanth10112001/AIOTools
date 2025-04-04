import React, { useState, useEffect } from "react";
import "../styles/PdfMerger.css";

function ToolInterface() {
  const [fileNames, setFileNames] = useState("No files chosen");

  useEffect(() => {
    const fileInput = document.getElementById("file-upload");

    if (fileInput) {
      fileInput.addEventListener("change", async (event) => {
        const files = event.target.files;

        if (files && files.length > 0) {
          const names =
            files.length > 3
              ? Array.from(files)
                  .slice(0, 3) // Slice the array first
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
            <input type="file" id="file-upload" multiple accept=".pdf" />
            <span className="file-name">{fileNames}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToolInterface;
