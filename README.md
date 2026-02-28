# How I Met My Recruiter

AI-powered job prep toolkit: landing page, chat assistant, and ATS resume checker.

## Features

- **Landing page** — Hero, feature overview, sample questions, and clear navigation to all tools.
- **AI Job Assistant** — Chat interface wired to OpenAI. Ask about roles, job descriptions, companies, salaries, and career advice.
- **ATS Resume Checker** — Upload a resume (PDF), paste a job description, get an ATS compatibility score plus keyword gaps and improvement tips.
- **About** — Explains how the chat and ATS checker work and how to get the most out of them.

## Prerequisites

- Node.js 18+
- [OpenAI API key](https://platform.openai.com/api-keys) (for chat and ATS)

## Getting started

```bash
git clone https://github.com/YOUR_USERNAME/recruiter-app.git
cd recruiter-app
npm install
```

Copy the example env file and add your OpenAI key:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set:

```
OPENAI_API_KEY=sk-your-key-here
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run start`| Run production server    |

## Tech stack

- **Next.js** (App Router) — UI and API routes  
- **OpenAI** (via Vercel AI SDK) — Chat and ATS analysis  
- **Tailwind CSS** — Styling  
- **TypeScript** — Typing  

## License

MIT — see [LICENSE](LICENSE).
