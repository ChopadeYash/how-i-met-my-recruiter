export default function Footer() {
  return (
    <footer className="border-t mt-auto py-6" style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
      <div className="max-w-6xl mx-auto px-4 text-center text-sm" style={{ color: "var(--text-muted)" }}>
        <p>How I Met My Recruiter &mdash; Your AI-powered job prep toolkit</p>
        <p className="mt-1">Built with Next.js · Powered by OpenAI</p>
      </div>
    </footer>
  );
}
