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

  useEffect(() => {
    if (responseRef.current && response) {
      responseRef.current.scrollTo({
        top: responseRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [response]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          OliveVoice 🌿
        </h1>

        <p className="text-center text-gray-600 mb-6">
          We’re here to help you share your testimony with humility and under the inspiration of the Holy Spirit, reflecting the Pentecostal faith and holiness.
          <br />
          <br />
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
            className="p-4 border rounded-lg text-gray-800 text-lg focus:outline-none focus:ring focus:ring-green-300
                       w-[calc(100vw-2rem)] md:w-full"
          />

          <div className="mt-3 w-full md:w-auto">
            <button
              type="submit"
              disabled={loading}
              className={`py-3 px-6 rounded-lg text-white font-semibold transition-all w-full md:w-auto ${
                loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Refining your testimony… ✨" : "Refine with OliveVoice"}
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="w-6 h-6 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {response && (
          <div
            ref={responseRef}
            className="mt-6 p-4 border rounded-lg bg-green-50 relative overflow-auto max-h-[400px]"
          >
            <h4 className="font-bold text-green-800 mb-2">Here is your refined testimony:</h4>
            <p className="text-gray-700 whitespace-pre-line">
              {response.match(/"(.*?)"/)?.[1] || response}
            </p>

            <button
              onClick={copyToClipboard}
              className="mt-4 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold"
            >
              Copy 📋
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
