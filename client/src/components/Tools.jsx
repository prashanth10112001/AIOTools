import React from "react";
import "../styles/Tools.css";
import Tool from "./Tool";
import pdfMergerImage from "../assets/pdfMerger.JPG";

function Tools() {
  const tools = [
    { name: "PDF Merger", image: pdfMergerImage, toolLink: "pdfMerger" },
    { name: "PDF resize", image: pdfMergerImage, toolLink: "/" },
    { name: "Docs Merger", image: pdfMergerImage, toolLink: "/" },
    { name: "Image Compressor", image: pdfMergerImage, toolLink: "/" },
    { name: "Image Resize", image: pdfMergerImage, toolLink: "/" },
    { name: "Image Enhancer", image: pdfMergerImage, toolLink: "/" },
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
              <Tool
                key={index}
                title={tool.name}
                image={tool.image}
                toolLink={tool.toolLink}
              />
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
