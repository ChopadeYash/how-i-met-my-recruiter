import Link from "next/link";

const features = [
  {
    icon: "💬",
    title: "AI Job Assistant",
    description:
      "Ask anything about a role, company culture, job description, salary ranges, or required skills. Get instant, scoped answers.",
    href: "/chat",
    cta: "Start Chatting",
    color: "#6366f1",
  },
  {
    icon: "📄",
    title: "ATS Resume Checker",
    description:
      "Upload your resume PDF and paste the job description. Get an ATS compatibility score, keyword gaps, and improvement tips.",
    href: "/ats-checker",
    cta: "Check My Resume",
    color: "#10b981",
  },
  {
    icon: "📖",
    title: "How It Works",
    description:
      "Learn how the AI assistant is scoped, what questions work best, and how the ATS scoring engine evaluates your resume.",
    href: "/about",
    cta: "Learn More",
    color: "#f59e0b",
  },
];

const sampleQuestions = [
  "What does a Senior Java Developer role at a fintech company typically involve?",
  "How is Amazon's work culture for software engineers?",
  "What's the pay range for a Gen AI Engineer with 3 years of experience?",
  "What skills are required for a Full Stack role with React and Node.js?",
  "Is this JD asking for too many things for a junior role?",
];

export default function HomePage() {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.3), transparent)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6 border"
            style={{
              background: "var(--accent-glow)",
              borderColor: "var(--accent)",
              color: "#a5b4fc",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            AI-Powered · Free to Explore
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            How I Met My{" "}
            <span style={{ color: "var(--accent)" }}>Recruiter</span>
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10" style={{ color: "var(--text-secondary)" }}>
            Your personal AI toolkit for job hunting. Understand any role, decode
            job descriptions, research companies, check salaries — and make sure
            your resume actually passes ATS filters.
          </p>

          <p className="text-sm max-w-xl mx-auto mb-8" style={{ color: "var(--text-muted)" }}>
            New here? <Link href="/about" className="underline hover:no-underline" style={{ color: "var(--accent)" }}>See how to study and use the tools</Link>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/chat"
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-150 hover:opacity-90 hover:scale-105"
              style={{ background: "var(--accent)" }}
            >
              Ask the AI Assistant →
            </Link>
            <Link
              href="/ats-checker"
              className="px-6 py-3 rounded-lg font-semibold transition-all duration-150 hover:scale-105 border"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
                background: "var(--bg-card)",
              }}
            >
              Check My Resume
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-3">What can you do here?</h2>
          <p className="text-center mb-10" style={{ color: "var(--text-secondary)" }}>
            Three tools. One goal: walk into that interview ready.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-6 border flex flex-col gap-4 hover:border-indigo-500 transition-all duration-200 group"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="text-3xl">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {f.description}
                  </p>
                </div>
                <Link
                  href={f.href}
                  className="mt-auto text-sm font-medium transition-colors"
                  style={{ color: f.color }}
                >
                  {f.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Questions */}
      <section className="py-16 px-4" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-3">Things you can ask</h2>
          <p className="text-center mb-8 text-sm" style={{ color: "var(--text-secondary)" }}>
            The AI assistant is scoped to job market questions — no fluff, no hallucinations about off-topic things.
          </p>
          <div className="flex flex-col gap-3">
            {sampleQuestions.map((q, i) => (
              <Link
                href={`/chat?q=${encodeURIComponent(q)}`}
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg border hover:border-indigo-500 transition-all duration-150 group"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <span className="text-indigo-400 mt-0.5 text-sm">→</span>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {q}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4">
        <div
          className="max-w-3xl mx-auto rounded-2xl p-10 text-center border"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(16,185,129,0.1))",
            borderColor: "var(--border)",
          }}
        >
          <h2 className="text-2xl font-bold mb-3">Is your resume cooked?</h2>
          <p className="mb-6 text-sm" style={{ color: "var(--text-secondary)" }}>
            Most resumes get rejected before a human ever reads them. Our ATS checker
            tells you exactly why and how to fix it.
          </p>
          <Link
            href="/ats-checker"
            className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--green)" }}
          >
            Check My Resume Now
          </Link>
        </div>
      </section>
    </div>
  );
}
