import React from "react";

export default function Header({ currentView, onNavigate }) {
  const scrollTo = (id) => {
    onNavigate("home");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <header className="header">
      <button
        className="header-logo"
        style={{ background: "none", border: "none", cursor: "pointer" }}
        onClick={() => onNavigate("home")}
      >
        AUTO<span>PEDIA</span>
      </button>

      <nav>
        <ul className="header-nav">
          <li>
            <a href="#catalog" className={currentView === "home" ? "active" : ""}
              onClick={(e) => { e.preventDefault(); scrollTo("catalog"); }}>
              Catalog
            </a>
          </li>
          <li>
            <a href="#recognition"
              onClick={(e) => { e.preventDefault(); scrollTo("recognition"); }}>
              AI Recognition
            </a>
          </li>
          <li>
            <a href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
