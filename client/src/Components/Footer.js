import React, { useState } from "react";

function Footer() {
  return (
    <div>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="sitemap-container">
              <h6>Sitemap</h6>
              <ul className="footer-links">
                <li>
                  <a href="/Register">Register</a>
                </li>
                <li>
                  <a href="https://www.lumos.exchange/">Main page</a>
                </li>
                <li>
                  <a href="/Login">Login</a>
                </li>
                <li>
                  <a href="https://www.lumos.exchange/roadmap">roadmap</a>
                </li>
                <li>
                  <a href="https://library.lumos.exchange/">Library</a>
                </li>
                <li>
                  <a href="https://www.lumos.exchange/team">Team</a>
                </li>
              </ul>
            </div>

            <div className="legal-container">
              <h6>legal</h6>
              <ul className="footer-links">
                <li>
                  <a href="https://www.lumos.exchange/coming-soon/our-policies">
                    Our terms
                  </a>
                </li>
                <li>
                  <a href="https://www.lumos.exchange/coming-soon/our-policies">
                    Your privacy
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-12 col-md-6">
              <h6>Subscribe to our newsletter</h6>
              <p className="text-justify">
                Get regular project updates and access to new events on Discord,
                Twitter or in the real world.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
