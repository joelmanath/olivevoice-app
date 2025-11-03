"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";

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
        className="focus:ring-2 focus:ring-emerald-300 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm"
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center"
        >
          {loading ? "Refining..." : "Refine with OliveVoice"}
          <Sparkles className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.form>
  );
}
