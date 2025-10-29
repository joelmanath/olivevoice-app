import { useState } from "react";

export default function TestimonyForm({ onSubmit }) {
  const [testimony, setTestimony] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (testimony.trim() === "") return;
    onSubmit(testimony);
    setTestimony("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <textarea
        rows="6"
        style={{ width: "100%", padding: "0.5rem" }}
        placeholder="Write your testimony here..."
        value={testimony}
        onChange={(e) => setTestimony(e.target.value)}
      />
      <button
        type="submit"
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          background: "#006400",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Submit
      </button>
    </form>
  );
}
