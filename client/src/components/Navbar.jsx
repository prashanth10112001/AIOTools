import React from "react";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <>
      <div>
        <nav>
          <div>LoGo</div>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Services</a>
            </li>
            <li>
              <a href="/">Resources</a>
            </li>
            <li>
              <a href="/">FAQ</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
