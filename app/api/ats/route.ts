import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse") as (buffer: Buffer) => Promise<{ text: string }>;

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resume") as File | null;
    const jobDescription = formData.get("jd") as string | null;

    if (!resumeFile || !jobDescription) {
      return Response.json({ error: "Resume file and job description are required." }, { status: 400 });
    }

    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
    const pdfData = await pdfParse(resumeBuffer);
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim().length < 50) {
      return Response.json({ error: "Could not extract text from the PDF. Make sure it is not a scanned image." }, { status: 400 });
    }

    const prompt = `You are an expert ATS (Applicant Tracking System) analyzer and resume coach.

Analyze the resume against the job description provided and return a structured JSON response.

RESUME TEXT:
${resumeText.slice(0, 4000)}

JOB DESCRIPTION:
${jobDescription.slice(0, 2000)}

Return ONLY a valid JSON object (no markdown, no explanation outside JSON) with this exact structure:
{
  "ats_score": <number 0-100>,
  "verdict": "<one of: 'Strong Match', 'Good Match', 'Needs Work', 'Weak Match'>",
  "summary": "<2-3 sentence overview of the match>",
  "matched_keywords": ["<keyword1>", "<keyword2>", ...],
  "missing_keywords": ["<keyword1>", "<keyword2>", ...],
  "strengths": ["<strength1>", "<strength2>", ...],
  "improvements": ["<specific actionable suggestion1>", "<suggestion2>", ...],
  "formatting_notes": ["<note about resume format/structure if any>"]
}`;

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    });

    const cleanedText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result = JSON.parse(cleanedText);

    return Response.json(result);
  } catch (err) {
    console.error("ATS route error:", err);
    return Response.json({ error: "Failed to analyze resume. Please try again." }, { status: 500 });
  }
}
