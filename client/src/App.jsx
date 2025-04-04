import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Tools from "./components/Tools";
import PdfMerger from "./components/PdfMergerTool";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tools />} />
        <Route path="/pdfMerger" element={<PdfMerger />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
