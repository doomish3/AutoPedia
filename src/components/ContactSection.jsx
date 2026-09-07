import React, { useState } from "react";
import { cars } from "../data/cars.js";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", car: "", message: "" });
  const [status, setStatus]     = useState("idle");
  const [response, setResponse] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setResponse("Please fill in all required fields.");
      return;
    }

    setStatus("loading");
    setResponse("");

    try {
      const res  = await fetch("api/contact.php", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setResponse(
          `✓ Message received, ${form.name}.\n\nFavourite car registered: ${form.car || "Not specified"}\n\nWe will contact you at ${form.email} shortly.`
        );
        setForm({ name: "", email: "", car: "", message: "" });
      } else {
        setStatus("error");
        setResponse("✗ Error: " + (data.message || "Please try again."));
      }
    } catch {
      /* Fallback when PHP server is not running (dev mode) */
      setStatus("success");
      setResponse(
        `✓ [DEMO MODE] Form is valid.\n\nName: ${form.name}\nEmail: ${form.email}\nCar: ${form.car || "Not specified"}\nMessage: ${form.message}\n\n(In production, this would be processed by PHP.)`
      );
      setForm({ name: "", email: "", car: "", message: "" });
    }
  };

  return (
    <div className="contact-section">
      <div className="section">
        <div className="section-header">
          <div>
            <p className="section-label">PHP Form</p>
            <h2 className="section-title-large">CONTACT</h2>
          </div>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Name *</label>
              <input
                id="name" name="name" className="form-input" type="text"
                placeholder="Your name" value={form.name} onChange={handleChange} required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email *</label>
              <input
                id="email" name="email" className="form-input" type="email"
                placeholder="you@email.com" value={form.email} onChange={handleChange} required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="car">Favourite car</label>
              <select
                id="car" name="car" className="form-select"
                value={form.car} onChange={handleChange}
              >
                <option value="">Select a car...</option>
                {cars.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.image} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message *</label>
              <textarea
                id="message" name="message" className="form-textarea"
                placeholder="What would you like to know?"
                value={form.message} onChange={handleChange} required
              />
            </div>

            <button type="submit" className="form-submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send message →"}
            </button>
          </form>

          {/* Response panel */}
          <div>
            <p className="section-label" style={{ marginBottom: "1rem" }}>
              PHP server response
            </p>
            <div
              className={`api-response ${
                status === "success" ? "success" : status === "error" ? "error" : ""
              }`}
            >
              {status === "idle" &&
                "// The PHP server response will appear here\n// endpoint: api/contact.php\n// method: POST (JSON)"}
              {status === "loading" && "// Connecting to PHP server..."}
              {response}
            </div>

            <div
              style={{
                marginTop: "1.5rem", padding: "1.5rem",
                background: "var(--bg3)", border: "1px solid var(--border)",
              }}
            >
              <p style={{
                fontFamily: "var(--font-condensed)", fontSize: "0.7rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--muted)", marginBottom: "0.75rem",
              }}>
                Tech stack
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7 }}>
                The form sends a <strong style={{ color: "var(--text)" }}>POST JSON</strong> request to{" "}
                <code style={{ color: "var(--gold)", fontSize: "0.8rem" }}>api/contact.php</code>, which
                validates the fields, logs the message on the server, and returns a
                JSON response. React manages state and UI dynamically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
