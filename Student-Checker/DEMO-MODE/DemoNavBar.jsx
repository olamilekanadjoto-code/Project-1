import { Link, useLocation } from "react-router-dom";
import "../stylesheets/navbar.css";
import "@fontsource/dm-sans";
import "@fontsource/cal-sans";
import "@fontsource/inter";
import { useEffect, useState } from "react";
import logo from "../src/assets/kestrel-college-crest.svg";

function DemoNavbar() {
  const [dropDown, setDropDown] = useState(false);
  const location = useLocation();
  const [navKey, setNavKey] = useState(0);

  useEffect(() => {
    if (window.innerWidth < 800) {
      setDropDown(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setDropDown(window.innerWidth >= 800);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth > 800) {
      setNavKey((prev) => prev + 1);
    }
  }, [location.pathname]);

  return (
    <>
      <svg
        onClick={() => setDropDown(true)}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: dropDown ? "none" : "block" }}
        id="bar"
        fill="#fff"
        className="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
        />
      </svg>
      <div
        className={dropDown ? "body" : "closedbody"}
        key={navKey}
        id="nav-bar"
        style={{ opacity: dropDown ? 1 : 1 }}
      >
        <div className="navBody">
          <div className="logo-et-header">
            <h1 className="header">K • T • C</h1>
            <img src={logo} alt="ots-logo" />
          </div>
          <div className="navBar">
            <Link to="/demo-home">
              <button className="linkButton">Home</button>
            </Link>
            <Link to="/demo-departments">
              <button className="linkButton">Departments</button>
            </Link>
            <Link to="/demo-about">
              <button className="linkButton">About Us</button>
            </Link>
            <Link to="/feedback-report">
              <button className="linkButton">Feedback</button>
            </Link>
            <Link to="/add-student">
              <button className="linkButton">Add Student</button>
            </Link>
            <span>
              <svg
                onClick={() => setDropDown(false)}
                xmlns="http://www.w3.org/2000/svg"
                id="arrow"
                fill="#ffffff"
                style={{
                  width: "34px",
                  height: "34px",
                  transform: "rotate(-90deg)",
                  position: "relative",
                  top: "35%",
                  left: "40%",
                }}
                className="bi bi-arrow-up-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default DemoNavbar;
