// pages/index.js
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const responseRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setResponse(data.response || "No response from AI");
    } catch (err) {
      setResponse("Error connecting to OliveVoice API.");
    }

    setLoading(false);
  };

  // Scroll into view when response updates
  useEffect(() => {
    if (responseRef.current && response) {
      responseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          OliveVoice 🌿
        </h1>

        <p className="text-center text-gray-600 mb-6">
          We’re here to help you share your testimony with humility and under the inspiration of the Holy Spirit, reflecting the Pentecostal faith and holiness.
          <br /><br />
          <span className="text-green-700 font-medium">
            Even if you feel hesitant, just write what’s in your heart — OliveVoice will help refine it with clarity and grace.
          </span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your testimony here..."
            rows="15"
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring focus:ring-green-300 text-gray-800 text-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className={`py-3 px-6 rounded-lg text-white font-semibold transition-all mt-2 self-start ${
              loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Refining your testimony… ✨" : "Refine with OliveVoice"}
          </button>
        </form>

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="w-6 h-6 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {response && (
          <div
            ref={responseRef}
            className="mt-6 p-4 border rounded-lg bg-green-50 relative"
          >
            <h2 className="font-bold text-green-800 mb-2">OliveVoice Suggestion</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {response.match(/"(.*?)"/)?.[1] || response}
            </p>

            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 py-1 px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"
            >
              Copy 📋
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
