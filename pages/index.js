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

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setResponse(data.response || "No response from AI");
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
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          OliveVoice 🌿
        </h1>
        <p className="text-center text-gray-500 mb-6">
          To help church members share their testimonies with humility and under the inspiration of the Holy Spirit, reflecting the faith and holiness upheld in TPM.
          \n Share your testimony below and OliveVoice will help refine it.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your testimony here..."
            rows="4"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-green-300"
          />
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4 rounded-lg text-white font-semibold transition-all ${
              loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Generating..." : "Refine with OliveVoice"}
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
            <p className="text-gray-700 whitespace-pre-line">{response}</p>

            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 text-sm text-green-600 hover:text-green-800"
            >
              Copy 📋
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
