import Link from "next/link";

const chatQuestions = [
  { q: "Role Breakdown", examples: ["What does a Data Engineer do day-to-day?", "What's the difference between SDE-1 and SDE-2?"] },
  { q: "JD Analysis", examples: ["What skills does this JD require?", "Is this job description realistic for a fresher?", "What are the red flags in this JD?"] },
  { q: "Company Research", examples: ["How is the work culture at Swiggy?", "What's the engineering culture like at Walmart Labs?"] },
  { q: "Salary & Compensation", examples: ["What's the pay for a Gen AI Engineer with 4 years exp in Bangalore?", "What's the hike I can expect switching from a startup to a FAANG?"] },
  { q: "Career Guidance", examples: ["What skills should I add to become a Staff Engineer?", "How do I transition from Java Backend to ML Engineering?"] },
];

const steps = [
  { icon: "1", title: "You ask a job question", desc: "Type your question in the chat box — about a role, JD, company, or salary." },
  { icon: "2", title: "Request goes to our API", desc: "Your message is sent to our Next.js API route. Your OpenAI key stays server-side, never exposed." },
  { icon: "3", title: "System prompt scopes the AI", desc: "A hidden system prompt tells the AI to only answer job market questions and refuse everything else." },
  { icon: "4", title: "Streamed response", desc: "The AI's answer streams back in real time — no waiting for the full response." },
];

const atsSteps = [
  { icon: "📤", title: "Upload Resume PDF", desc: "We use pdf-parse to extract raw text from your PDF server-side." },
  { icon: "📋", title: "Paste Job Description", desc: "The JD tells the AI what this specific role is looking for." },
  { icon: "🤖", title: "AI Analysis", desc: "Both texts are sent to GPT-4o-mini with a structured prompt that returns JSON." },
  { icon: "📊", title: "Score + Insights", desc: "You get an ATS score, matched/missing keywords, strengths, and actionable improvements." },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-3">About How I Met My Recruiter</h1>
        <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
          A no-fluff, AI-powered toolkit to help you understand any job opportunity and walk into interviews
          better prepared — without paying for a career coach.
        </p>
      </div>

      {/* How the Chat Works */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-2">How the AI Chat Works</h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          The AI is intentionally <strong style={{ color: "var(--text-primary)" }}>scoped to job market questions only</strong>.
          It won&apos;t help you write code, do math, or tell you recipes. That keeps answers focused and reliable.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((s) => (
            <div key={s.title} className="flex gap-4 p-5 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white" style={{ background: "var(--accent)" }}>
                {s.icon}
              </div>
              <div>
                <p className="font-medium text-sm mb-1">{s.title}</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What You Can Ask */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-2">What You Can Ask</h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Here are the types of questions the AI handles well:
        </p>
        <div className="flex flex-col gap-4">
          {chatQuestions.map((item) => (
            <div key={item.q} className="p-5 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <p className="font-semibold text-sm mb-2 text-indigo-400">{item.q}</p>
              <ul className="flex flex-col gap-1">
                {item.examples.map((ex) => (
                  <li key={ex} className="text-sm flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                    <span className="mt-0.5 text-indigo-400">→</span> {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How ATS Checker Works */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-2">How the ATS Checker Works</h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          ATS (Applicant Tracking System) software filters resumes before a human ever sees them.
          Most rejections happen here. Our checker simulates what an ATS looks for.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {atsSteps.map((s) => (
            <div key={s.title} className="flex gap-4 p-5 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="text-2xl shrink-0">{s.icon}</div>
              <div>
                <p className="font-medium text-sm mb-1">{s.title}</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-2">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: "Next.js 15", role: "Framework + API Routes" },
            { name: "Vercel AI SDK", role: "Streaming AI integration" },
            { name: "GPT-4o-mini", role: "Language model" },
            { name: "pdf-parse", role: "Resume text extraction" },
            { name: "Tailwind CSS", role: "Styling" },
            { name: "TypeScript", role: "Type safety" },
          ].map((t) => (
            <div key={t.name} className="p-4 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/chat"
          className="inline-block px-8 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          Start Chatting →
        </Link>
      </div>
    </div>
  );
}
