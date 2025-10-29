import { useState } from "react";

export default function Home() {
  const [testimony, setTestimony] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("Generating response...");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: testimony }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.response || "No response from AI");
      } else {
        setResponse(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      setResponse("Network error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>OliveVoice ✨</h1>
      <p>Share your testimony, and OliveVoice will help you express it with grace.</p>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="6"
          cols="60"
          placeholder="Write your testimony here..."
          value={testimony}
          onChange={(e) => setTestimony(e.target.value)}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Submit"}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
          <h2>💬 OliveVoice Suggestion</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
