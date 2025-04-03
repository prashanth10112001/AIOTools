import React from "react";
import "../styles/Tools.css";
import Tool from "./Tool";
import pdfMergerImage from "../assets/pdfMerger.JPG";

function Tools() {
  const tools = [
    { name: "PDF Merger", image: pdfMergerImage },
    { name: "PDF resize", image: pdfMergerImage },
    { name: "Docs Merger", image: pdfMergerImage },
    { name: "Image Compressor", image: pdfMergerImage },
    { name: "Image Resize", image: pdfMergerImage },
    { name: "Image Enhancer", image: pdfMergerImage },
  ];
  return (
    <>
      <div className="tools">
        <div className="section1">
          <div className="title">
            <h2>Engineering Tools</h2>
          </div>
          <div className="items">
            {tools.map((tool, index) => (
              <Tool key={index} title={tool.name} image={tool.image} />
            ))}
          </div>
        </div>
        <div className="section1">
          <div className="title">
            <h2>Engineering Tools</h2>
          </div>
          <div className="items">
            {tools.map((tool, index) => (
              <Tool key={index} title={tool.name} image={tool.image} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tools;
