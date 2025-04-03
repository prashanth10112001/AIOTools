import React from "react";
import { Link } from "react-router-dom";
import "../styles/Tool.css";

function Tool({ title, image, toolLink }) {
  return (
    <>
      <Link to={toolLink} className="tool">
        <div className="toolImage">
          <img src={image} alt="newImage" />
        </div>
        <div className="toolTitle">
          <p>{title}</p>
        </div>
      </Link>
    </>
  );
}

export default Tool;
