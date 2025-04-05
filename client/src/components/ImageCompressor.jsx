import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ImageCompressor.css"; // Adjust the path as necessary

function ImageCompressor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [quality, setQuality] = useState(80);
  const [fileNames, setFileNames] = useState("No files chosen");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setMessage("");
  };

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setMessage("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("quality", quality);

    try {
      const response = await axios.post(
        "http://localhost:5000/imageCompressor",
        formData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `compressed_${Date.now()}.jpg`);
      document.body.appendChild(link);
      link.click();
      setMessage("Image compressed and downloaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("Upload failed.");
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
    <div>
      <div className="pdfCompressorBox">
        <div>
          <h1>Image Compressor Tool</h1>
        </div>
        <div className="pdfCompressorBorder">
          <div className="pdfCompressorTitle">
            <p>Please select the an image to compress ...</p>
          </div>

          <div className="pdfCompressorInput">
            <div className="qualityBox">
              <label htmlFor="quality" className="qualityLabel">
                Image Quality ( 0 - 100 ):
              </label>
              <input
                id="quality"
                type="number"
                value={quality}
                onChange={handleQualityChange}
                placeholder="Image Quality (0-100)"
                min="0"
                max="100"
              />
            </div>
            <div className="pdfCompressorInputBox">
              <label htmlFor="file-upload" className="labelupload">
                Choose File
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*, image/x-canon-cr2"
                onChange={handleImageChange}
              />
              {selectedImage != null &&
                (!isLoading ? (
                  <button onClick={handleUpload} disabled={isLoading}>
                    Compress Image
                  </button>
                ) : (
                  <div className="loader"></div>
                ))}
              {message && <p>{message}</p>}
            </div>
            <span className="file-name">{fileNames}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCompressor;
