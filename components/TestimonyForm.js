"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function TestimonyForm({ onSubmit, loading }) {
  const [testimony, setTestimony] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!testimony.trim()) return;
    await onSubmit(testimony);
    setTestimony("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Textarea
        rows={8}
        placeholder="Write your testimony here..."
        value={testimony}
        onChange={(e) => setTestimony(e.target.value)}
        className="focus:ring-2 focus:ring-emerald-400 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-md text-sm shadow-sm"
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold transition-all duration-200 ${
            loading
              ? "bg-emerald-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 shadow-md"
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Refining...
            </>
          ) : (
            <>
              Refine with OliveVoice
              <Sparkles className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
}
