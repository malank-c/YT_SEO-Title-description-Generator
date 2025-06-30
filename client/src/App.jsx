import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaClipboard, FaFilePdf, FaFileWord, FaFileAlt } from "react-icons/fa";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import "./styles/App.css";

function App() {
  const [script, setScript] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState(1);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/generate`, {
        script,
        count: sliderValue, // Slider to set the value of alternate responses
      });
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setResult("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };
  
  // Function to copy response after generation
  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Function to download response after generation
  const handleDownload = (type) => {
  if (!result) return;

  const filename = `youtube_output.${type}`;

  // Download as PDF, TXT, DOC
  if (type === "txt" || type === "doc") {
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
  } else if (type === "pdf") {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(result, 180); // wrap text if too big
    ddoc.setFont("Times", "Normal");
    doc.setFontSize(14);
    doc.text("Generated YouTube Title & Description", 10, 10);
    doc.text(lines, 10, 20);
    doc.save(filename);
  }
};

  return (
    <div className="d-flex flex-column min-vh-100 bg-light w-100 animated-bg" style={{ overflowX: "hidden" }}>
      {/* Top-Centered Title */}
      <header className="app-header text-center py-4">
        <h1 className="main-title">YouTube Title & Description Generator</h1>
        <p className="subtitle">Powered by AI for Catchy, SEO-Ready Output</p>
        </header>


      {/* Main Grid */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-start pb-5">
        <div className="container-fluid px-4">
          <div className="grid-layout">
            {/* Input Box to the Left */}
            <section className="input-section">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="script" className="form-label fw-bold">
                    Paste Your Script
                  </label>
                  <textarea
                    id="script"
                    className="form-control"
                    rows="8"
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="alternateSlider" className="form-label fw-bold">
                    Number of Alternatives: <span className="text-primary">{sliderValue}</span>
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min="1"
                    max="8"
                    step="1"
                    id="alternateSlider"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(parseInt(e.target.value))}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Generating..." : "Generate"}
                </button>
              </form>
            </section>

            {/* Output Display to the Right*/}
            <section className="output-section">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="fw-semibold text-secondary">Generating awesome titles...</p>
                </div>
              ) : result ? (
                <>
                {/* Buttons to handle Copy, Download as set before */}
                  <div className="d-flex justify-content-end gap-3 mb-2 flex-wrap">
                    <button className="btn btn-outline-secondary btn-sm" onClick={handleCopy}>
                      <FaClipboard className="me-1" />
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleDownload("doc")}>
                      <FaFileWord className="me-1" />
                      .DOC
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDownload("pdf")}>
                      <FaFilePdf className="me-1" />
                      .PDF
                    </button>
                    <button className="btn btn-outline-dark btn-sm" onClick={() => handleDownload("txt")}>
                      <FaFileAlt className="me-1" />
                      .TXT
                    </button>
                  </div>

                  <div className="markdown-container">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {result}
                    </ReactMarkdown>
                  </div>
                </>
              ) : (
                <p className="text-muted">Your generated title and description will appear here.</p>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        &copy; {new Date().getFullYear()} YouTube AI Generator. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
