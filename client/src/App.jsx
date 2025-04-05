import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Tools from "./components/Tools";
import PdfMerger from "./components/PdfMergerTool";
import ImageCompressor from "./components/ImageCompressor";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tools />} />
        <Route path="/pdfMerger" element={<PdfMerger />} />
        <Route path="/imageCompressor" element={<ImageCompressor />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
