import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footerRow">
          <div className="leftFooter">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Our services</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
              <li>
                <a href="#">Affiliate program</a>
              </li>
            </ul>
          </div>
          <div className="rightFooter">
            <h4>Get Help</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Shipping</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Order Status</a>
              </li>
            </ul>
          </div>
        </div>
        <div>&copy; 2023 All rights reserved</div>
      </div>
    </>
  );
}

export default Footer;
