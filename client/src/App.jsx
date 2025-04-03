import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Tools from "./components/Tools";
import ToolInterface from "./components/ToolInterface";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tools />} />
        <Route path="/toolInterface" element={<ToolInterface />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
