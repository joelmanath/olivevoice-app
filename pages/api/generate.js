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
            "You are OliveVoice — a writing assistant that helps TPM believers share their testimonies with humility and grace, inspired by the Holy Spirit.",
        },
        {
          role: "user",
          content: input,
        },
      ],
    });

    const output = completion.choices[0]?.message?.content || "No response from AI";
    return res.status(200).json({ response: output });
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
