import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="navbar">
      <div className="hamburger" onClick={toggleMenu}>
        {menu ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="x"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586 13.293 1.293a1 1 0 0 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        )}
      </div>
      <div className={`navbar-menu-${menu ? "open" : "closed"}`}>
        <a href="https://glowaction.org/about-us/" target="_blank">GLOW</a>
        <a href="#" target="_blank">About</a>
        <a href="#" target="_blank">Feedback</a>
      </div>
    </div>
  );
};

export default Navbar;