import { useState } from "react";
import TestimonyForm from "../components/TestimonyForm";

export default function Home() {
  const [response, setResponse] = useState("");

  const handleSubmit = async (testimony) => {
    setResponse("Generating summary...");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: "Your testimony prompt here" }),
    });
    const data = await res.json();
    setResponse(data.summary || "No response");
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>OliveVoice</h1>
      <p>Share your testimony and let AI help refine and summarize it beautifully.</p>
      <TestimonyForm onSubmit={handleSubmit} />
      {response && (
        <div style={{ marginTop: "1rem", padding: "1rem", background: "#f5f5f5" }}>
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
