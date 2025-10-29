import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { testimony } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant summarizing Christian testimonies in an inspiring way." },
        { role: "user", content: `Summarize this testimony faithfully and warmly:\n${testimony}` },
      ],
    });

    res.status(200).json({ summary: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating summary" });
  }
}
