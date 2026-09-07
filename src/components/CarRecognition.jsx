import React, { useState, useRef } from "react";

const STYLES = {
  section: {
    borderTop: "1px solid var(--border)",
    borderBottom: "1px solid var(--border)",
    background: "var(--bg2)",
  },
  dropzone: (dragging) => ({
    border: `2px dashed ${dragging ? "var(--gold)" : "var(--border2)"}`,
    borderRadius: "var(--radius-lg, 8px)",
    padding: "3rem 2rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
    background: dragging ? "rgba(212,168,73,0.04)" : "var(--bg3)",
    marginBottom: "1.5rem",
  }),
  previewImg: {
    maxHeight: "320px",
    maxWidth: "100%",
    objectFit: "contain",
    borderRadius: "4px",
    marginBottom: "1rem",
    border: "1px solid var(--border)",
  },
  analyzeBtn: (disabled) => ({
    background: disabled ? "rgba(255,255,255,0.1)" : "var(--text)",
    color: disabled ? "var(--muted)" : "var(--bg)",
    border: "none",
    padding: "14px 32px",
    fontFamily: "var(--font-condensed)",
    fontSize: "0.85rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background 0.2s",
    marginBottom: "1.5rem",
    display: "block",
  }),
  resultBox: {
    background: "var(--bg3)",
    border: "1px solid var(--border)",
    padding: "2rem",
    lineHeight: 1.8,
  },
  label: {
    fontFamily: "var(--font-condensed)",
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "0.5rem",
    display: "block",
  },
  tag: (color) => ({
    display: "inline-block",
    fontFamily: "var(--font-condensed)",
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    border: `1px solid ${color}`,
    color: color,
    padding: "3px 10px",
    marginRight: "8px",
    marginBottom: "8px",
  }),
};

/* Parse the AI markdown-like response into structured sections */
function parseResult(text) {
  const sections = [];
  const lines = text.split("\n").filter((l) => l.trim());
  let current = null;

  for (const line of lines) {
    if (line.startsWith("##") || line.startsWith("**") && line.endsWith("**")) {
      if (current) sections.push(current);
      current = { title: line.replace(/[#*]/g, "").trim(), items: [] };
    } else if (line.startsWith("-") || line.startsWith("•")) {
      if (!current) current = { title: "Details", items: [] };
      current.items.push(line.replace(/^[-•]\s*/, "").trim());
    } else if (line.trim()) {
      if (!current) current = { title: "Overview", items: [] };
      current.items.push(line.trim());
    }
  }
  if (current) sections.push(current);
  return sections;
}

export default function CarRecognition() {
  const [image, setImage]       = useState(null);   // { base64, dataUrl, type }
  const [dragging, setDragging] = useState(false);
  const [status, setStatus]     = useState("idle"); // idle | loading | done | error
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState("");
  const inputRef                = useRef();

  /* ── File handling ── */
  const loadFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const base64  = dataUrl.split(",")[1];
      setImage({ base64, dataUrl, type: file.type });
      setResult(null);
      setStatus("idle");
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const onFileChange  = (e) => loadFile(e.target.files[0]);
  const onDrop        = (e) => { e.preventDefault(); setDragging(false); loadFile(e.dataTransfer.files[0]); };
  const onDragOver    = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave   = () => setDragging(false);

  /* ── AI call ── */
  const analyze = async () => {
    if (!image) return;
    setStatus("loading");
    setResult(null);
    setError("");

    try {
      // Call our PHP proxy (avoids CORS — browsers cannot call api.anthropic.com directly)
      const response = await fetch("api/recognize.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_base64: image.base64,
          media_type:   image.type,
        }),
      });

      const data = await response.json();

      if (!data.success) throw new Error(data.message || "Server error.");

      setResult(parseResult(data.text));
      setStatus("done");
    } catch (err) {
      setError("Analysis failed: " + err.message);
      setStatus("error");
    }
  };

  /* ── Render ── */
  return (
    <div style={STYLES.section}>
      <div className="section">
        {/* Header */}
        <div className="section-header">
          <div>
            <p className="section-label">Powered by Claude AI</p>
            <h2 className="section-title-large">CAR RECOGNITION</h2>
          </div>
          <span className="section-count">AI</span>
        </div>

        <p style={{ color: "var(--muted)", fontSize: "1rem", marginBottom: "2.5rem", maxWidth: "600px", lineHeight: 1.7 }}>
          Upload any photo of a car and our AI will identify the make, model,
          year, and give you a full breakdown of its history, specs, and engineering.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          {/* LEFT — upload */}
          <div>
            <span style={STYLES.label}>Upload image</span>

            {/* Dropzone */}
            <div
              style={STYLES.dropzone(dragging)}
              onClick={() => inputRef.current.click()}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
            >
              {image ? (
                <>
                  <img src={image.dataUrl} alt="Car preview" style={STYLES.previewImg} />
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                    Click or drop to replace image
                  </p>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📷</div>
                  <p style={{ fontFamily: "var(--font-condensed)", fontSize: "1rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                    DROP YOUR CAR PHOTO HERE
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                    or click to browse — JPG, PNG, WEBP
                  </p>
                </>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onFileChange}
            />

            <button
              style={STYLES.analyzeBtn(!image || status === "loading")}
              disabled={!image || status === "loading"}
              onClick={analyze}
            >
              {status === "loading" ? "🔍 Analysing..." : "🔍 Identify this car →"}
            </button>

            {/* Info box */}
            <div style={{ padding: "1.25rem", background: "var(--bg3)", border: "1px solid var(--border)", fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.7 }}>
              <span style={STYLES.label}>How it works</span>
              The image is sent to <span style={{ color: "var(--gold)" }}>Gemini vision API</span>, which
              analyses the visual details — body shape, lights, grille, badges, wheels —
              to identify the car and generate a complete breakdown.
            </div>
          </div>

          {/* RIGHT — result */}
          <div>
            <span style={STYLES.label}>AI analysis result</span>

            {status === "idle" && !result && (
              <div style={{ ...STYLES.resultBox, color: "var(--muted)", fontSize: "0.875rem" }}>
                {`// Upload a car photo and click "Identify"\n// to see the AI analysis here.`}
              </div>
            )}

            {status === "loading" && (
              <div style={{ ...STYLES.resultBox, color: "var(--muted)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {["Examining body shape...", "Reading design cues...", "Checking historical records...", "Compiling analysis..."].map((msg, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", opacity: 0.4 + i * 0.2 }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)", animation: "none" }} />
                      <span style={{ fontFamily: "var(--font-condensed)", fontSize: "0.85rem", letterSpacing: "0.05em" }}>{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {status === "error" && (
              <div style={{ ...STYLES.resultBox, borderColor: "rgba(192,57,43,0.5)", color: "#e74c3c", fontSize: "0.875rem" }}>
                ✗ {error}
              </div>
            )}

            {status === "done" && result && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {result.map((section, i) => (
                  <div key={i} style={STYLES.resultBox}>
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      color: "var(--gold)",
                      marginBottom: "0.75rem",
                      letterSpacing: "0.05em",
                    }}>
                      {section.title}
                    </div>
                    {section.items.map((item, j) => {
                      const isKV = item.includes(":") && item.indexOf(":") < 30;
                      if (isKV) {
                        const [key, ...rest] = item.split(":");
                        return (
                          <div key={j} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem", fontSize: "0.875rem" }}>
                            <span style={{ color: "var(--muted)", minWidth: "130px", fontFamily: "var(--font-condensed)", letterSpacing: "0.05em" }}>{key}:</span>
                            <span style={{ color: "var(--text)" }}>{rest.join(":").trim()}</span>
                          </div>
                        );
                      }
                      return (
                        <p key={j} style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "0.4rem" }}>
                          {item.startsWith("-") ? "· " + item.slice(1).trim() : item}
                        </p>
                      );
                    })}
                  </div>
                ))}

                <button
                  style={{ ...STYLES.analyzeBtn(false), marginBottom: 0, alignSelf: "flex-start" }}
                  onClick={() => { setImage(null); setResult(null); setStatus("idle"); inputRef.current.value = ""; }}
                >
                  ← Analyse another car
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
