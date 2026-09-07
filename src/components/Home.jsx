import React, { useEffect, useRef } from "react";
import { cars } from "../data/cars.js";
import ContactSection from "./ContactSection.jsx";
import CarRecognition from "./CarRecognition.jsx";

export default function Home({ onSelectCar }) {
  const fadeRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    fadeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
  };

  return (
    <>
      {/* HERO */}
      <section className="hero" id="hero">
        <div>
          <p className="hero-eyebrow">Automotive Encyclopedia</p>
          <h1 className="hero-title">
            HISTORY
            <br />
            <span className="line2">&amp; MECHANICS</span>
          </h1>
          <p className="hero-sub">
            Four cars that changed history. Their origins, engineering,
            and the components that make them legendary.
          </p>
          <button
            className="hero-cta"
            onClick={() =>
              document
                .getElementById("catalog")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore catalog →
          </button>
        </div>

        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* CATALOG */}
      <section className="section" id="catalog">
        <div className="section-header" ref={addRef} style={{ opacity: 1 }}>
          <div>
            <p className="section-label">Catalog</p>
            <h2 className="section-title-large">THE CHOSEN ONES</h2>
          </div>
          <span className="section-count">04</span>
        </div>

        <div className="cars-grid">
          {cars.map((car, i) => (
            <button
              key={car.id}
              className="car-card fade-in"
              ref={addRef}
              style={{
                "--card-accent": car.accent,
                transitionDelay: `${i * 0.1}s`,
                background: "none",
                border: "none",
                textAlign: "left",
                width: "100%",
              }}
              onClick={() => onSelectCar(car.id)}
            >
              <div className="car-card-emoji">{car.image}</div>
              <div className="car-card-category">{car.category}</div>
              <div className="car-card-name">{car.name}</div>
              <div className="car-card-sub">{car.subtitle}</div>
              <div className="car-card-year">
                {car.origin} · {car.year}
              </div>
              <span className="car-card-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      {/* STATS STRIP */}
      <div
        className="fade-in"
        ref={addRef}
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1px",
          background: "var(--border)",
        }}
      >
        {[
          { n: "4",    label: "Iconic cars" },
          { n: "81",   label: "Years of history" },
          { n: "21M+", label: "Beetle units" },
          { n: "240",  label: "mph F1 record" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "var(--bg2)",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.8rem",
                color: "var(--gold)",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              {stat.n}
            </div>
            <div
              style={{
                fontFamily: "var(--font-condensed)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* AI RECOGNITION */}
      <section id="recognition">
        <CarRecognition />
      </section>

      {/* CONTACT */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem" }}>
        <div className="footer">
          <span className="footer-copy">
            © 2024 AutoPedia — Academic project IWP
          </span>
          <div className="footer-tech">
            {["React", "HTML5", "CSS3", "JavaScript", "PHP"].map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
