"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TestimonyForm from "../components/TestimonyForm";
import { Button } from "../components/ui/button";
import { Clipboard } from "lucide-react";

export default function Home() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (input) => {
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
      setResponse(data.response || "No response from OliveVoice");
    } catch (error) {
      setResponse("Error connecting to OliveVoice API.");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 p-4 sm:p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl flex flex-col md:flex-row gap-8"
      >
        {/* Left Column: Form */}
        <motion.div
          className="flex-1 backdrop-blur-xl bg-white/70 shadow-2xl rounded-2xl p-6 md:p-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-emerald-700 mb-2">
            OliveVoice 🌿
          </h1>
          <p className="text-gray-600 mb-6">
            Share your testimony with humility and grace.
          </p>
          <TestimonyForm onSubmit={handleGenerate} loading={loading} />
        </motion.div>

        {/* Right Column: Response */}
        {response && (
          <motion.div
            className="flex-1 backdrop-blur-xl bg-white/60 shadow-xl rounded-2xl p-6 md:p-8 flex flex-col justify-between"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-800 whitespace-pre-line mb-4">{response}</p>
            <Button
              onClick={copyToClipboard}
              className="bg-emerald-600 hover:bg-emerald-700 text-white self-end"
            >
              <Clipboard className="mr-2 h-4 w-4" /> Copy
            </Button>
          </motion.div>
        )}

        {loading && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
