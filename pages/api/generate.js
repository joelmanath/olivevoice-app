// pages/api/generate.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("OpenAI API key present?", !!process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Missing input" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are OliveVoice — a writing assistant that helps TPM believers share their testimonies with humility and grace, inspired by the Holy Spirit. When giving your response, include the improved testimony inside quotation marks on its own line.",
        },
        {
          role: "user",
          content: input,
        },
      ],
    });

    const fullText = completion.choices[0]?.message?.content || "No response from AI";

    // Extract only the text inside quotes if available
    const match = fullText.match(/"([^"]+)"/s);
    const extracted = match ? match[1] : fullText;

    console.log("✅ Final extracted output:", extracted);

    return res.status(200).json({ response: extracted });
  } catch (error) {
    console.error("API error full:", error);

    if (error.code === "insufficient_quota") {
      return res.status(429).json({
        error: "OliveVoice is currently at its usage limit. Please try again later.",
      });
    }

    return res.status(500).json({
      error: error.message || "Unknown error",
    });
  }
}
