import React, { useEffect, useRef } from "react";
import { cars } from "../data/cars.js";

export default function CarDetail({ carId, onBack }) {
  const car = cars.find((c) => c.id === carId);
  const fadeRefs = useRef([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    fadeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [carId]);

  const addRef = (el) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
  };

  if (!car) return null;

  return (
    <>
      {/* DETAIL HERO */}
      <div
        className="detail-hero"
        data-emoji={car.image}
        style={{ background: `linear-gradient(to bottom, var(--bg) 0%, var(--bg2) 100%)` }}
      >
        <div className="detail-hero-inner">
          <button className="detail-back" onClick={onBack}>
            ← Back to catalog
          </button>

          <p className="detail-category">
            {car.category} · {car.origin}
          </p>

          <h1 className="detail-title">{car.name}</h1>
          <p className="detail-subtitle">{car.subtitle}</p>

          <div className="detail-meta">
            <div className="detail-meta-item">
              <span className="detail-meta-label">Period</span>
              <span className="detail-meta-value">{car.year}</span>
            </div>
            <div className="detail-meta-item">
              <span className="detail-meta-label">Origin</span>
              <span className="detail-meta-value">{car.origin}</span>
            </div>
            <div className="detail-meta-item">
              <span className="detail-meta-label">Category</span>
              <span className="detail-meta-value">{car.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="detail-body">

        <p className="detail-intro fade-in" ref={addRef}>
          {car.intro}
        </p>

        <h2 className="detail-section-title fade-in" ref={addRef}>
          Specifications
        </h2>
        <div className="specs-row fade-in" ref={addRef}>
          {Object.entries(car.specs).map(([key, val]) => {
            const labels = {
              power:        "Power",
              engine:       "Engine",
              acceleration: "0 – 60 mph",
              topSpeed:     "Top Speed",
              weight:       "Weight",
              price:        "Approx. Price",
            };
            return (
              <div className="spec-item" key={key}>
                <div className="spec-value" style={{ color: car.accent }}>{val}</div>
                <div className="spec-label">{labels[key] || key}</div>
              </div>
            );
          })}
        </div>

        <h2 className="detail-section-title fade-in" ref={addRef}>
          History
        </h2>
        <div className="timeline fade-in" ref={addRef}>
          {car.history.map((item) => (
            <div key={item.year} className="timeline-item">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-event">{item.event}</div>
              <div className="timeline-detail">{item.detail}</div>
            </div>
          ))}
        </div>

        <h2 className="detail-section-title fade-in" ref={addRef}>
          Components
        </h2>
        <div className="components-grid fade-in" ref={addRef}>
          {car.components.map((comp) => (
            <div key={comp.name} className="component-card">
              <span className="component-icon">{comp.icon}</span>
              <div className="component-name">{comp.name}</div>
              <div className="component-desc">{comp.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className="hero-cta" onClick={onBack}>
            ← View all cars
          </button>
        </div>
      </div>
    </>
  );
}
