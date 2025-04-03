import React from "react";
import "../styles/Tool.css";
import pdfMergerImage from "../assets/pdfMerger.JPG";

function Tool({ title, image }) {
  return (
    <>
      <div className="tool">
        <div className="toolImage">
          <img src={image} alt="newImage" />
        </div>
        <div className="toolTitle">
          <p>{title}</p>
        </div>
      </div>
    </>
  );
}

export default Tool;
