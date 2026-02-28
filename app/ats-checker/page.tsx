"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type ATSResult = {
  ats_score: number;
  verdict: string;
  summary: string;
  matched_keywords: string[];
  missing_keywords: string[];
  strengths: string[];
  improvements: string[];
  formatting_notes: string[];
};

function ScoreMeter({ score }: { score: number }) {
  const color = score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="54" fill="none" stroke="var(--border)" strokeWidth="10" />
        <circle
          cx="70" cy="70" r="54" fill="none"
          stroke={color} strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text x="70" y="66" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">{score}</text>
        <text x="70" y="84" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">/100</text>
      </svg>
    </div>
  );
}

function TagList({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="px-2 py-1 rounded-md text-xs font-medium" style={{ background: `${color}20`, color }}>
          {item}
        </span>
      ))}
    </div>
  );
}

export default function ATSCheckerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const handleSubmit = async () => {
    if (!file || !jd.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    const form = new FormData();
    form.append("resume", file);
    form.append("jd", jd);

    try {
      const res = await fetch("/api/ats", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verdictColor = {
    "Strong Match": "#10b981",
    "Good Match": "#6366f1",
    "Needs Work": "#f59e0b",
    "Weak Match": "#ef4444",
  }[result?.verdict ?? ""] ?? "#94a3b8";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">ATS Resume Checker</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Upload your resume and paste the job description. We&apos;ll score your ATS compatibility, find missing keywords, and suggest improvements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Resume (PDF)</label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all"
            style={{
              borderColor: isDragActive ? "var(--accent)" : file ? "#10b981" : "var(--border)",
              background: isDragActive ? "var(--accent-glow)" : "var(--bg-card)",
            }}
          >
            <input {...getInputProps()} />
            {file ? (
              <div>
                <div className="text-2xl mb-2">✅</div>
                <p className="font-medium text-sm">{file.name}</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {(file.size / 1024).toFixed(1)} KB · Click to replace
                </p>
              </div>
            ) : (
              <div>
                <div className="text-3xl mb-3">📄</div>
                <p className="text-sm font-medium">Drop your resume PDF here</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>or click to browse</p>
              </div>
            )}
          </div>
        </div>

        {/* JD Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Job Description</label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={10}
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-indigo-500 transition-colors resize-none"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !file || !jd.trim()}
        className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ background: "var(--green)" }}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analyzing your resume...
          </>
        ) : (
          "Analyze ATS Compatibility →"
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 rounded-xl border text-sm" style={{ background: "#ef444420", borderColor: "#ef4444", color: "#fca5a5" }}>
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-10 flex flex-col gap-6">
          <h2 className="text-xl font-bold">Results</h2>

          {/* Score + Verdict */}
          <div className="rounded-xl border p-6 flex flex-col sm:flex-row items-center gap-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <ScoreMeter score={result.ats_score} />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                <span className="text-xl font-bold">ATS Score</span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: `${verdictColor}20`, color: verdictColor }}>
                  {result.verdict}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{result.summary}</p>
            </div>
          </div>

          {/* Keywords Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span>✅</span> Matched Keywords ({result.matched_keywords.length})
              </h3>
              {result.matched_keywords.length > 0 ? (
                <TagList items={result.matched_keywords} color="#10b981" />
              ) : (
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>No strong matches found.</p>
              )}
            </div>
            <div className="rounded-xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span>❌</span> Missing Keywords ({result.missing_keywords.length})
              </h3>
              {result.missing_keywords.length > 0 ? (
                <TagList items={result.missing_keywords} color="#ef4444" />
              ) : (
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>No major gaps found!</p>
              )}
            </div>
          </div>

          {/* Strengths */}
          <div className="rounded-xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <h3 className="text-sm font-semibold mb-3">💪 Strengths</h3>
            <ul className="flex flex-col gap-2">
              {result.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span className="text-green-400 mt-0.5">→</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="rounded-xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <h3 className="text-sm font-semibold mb-3">🔧 Suggested Improvements</h3>
            <ul className="flex flex-col gap-2">
              {result.improvements.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "#f59e0b" }} className="mt-0.5">→</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Formatting Notes */}
          {result.formatting_notes?.length > 0 && (
            <div className="rounded-xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <h3 className="text-sm font-semibold mb-3">📐 Formatting Notes</h3>
              <ul className="flex flex-col gap-2">
                {result.formatting_notes.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="text-indigo-400 mt-0.5">→</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
