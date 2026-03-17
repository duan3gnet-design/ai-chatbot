import { useState } from "react";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const newHistory = [...history, userMsg];
    var limit = 3;

    if (newHistory.length < limit * 2) {
      //https://ai-chatbot-l9e4.onrender.com
      //http://localhost:8000
      const res = await fetch("https://ai-chatbot-l9e4.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history }),
      });

      const data = await res.json();
      const botMsg = { role: "assistant", content: data.reply };

      setHistory([...newHistory, botMsg]);
      setInput("");
    } else alert(`Exceeded the limit of ${limit} queries.`)
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <div style={{ height: 400, overflowY: "auto", border: "1px solid #ccc", padding: 10, borderRadius: 8 }}>
        {history.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === "user" ? "right" : "left", margin: "8px 0" }}>
            <span style={{
              background: msg.role === "user" ? "#0084ff" : "#e5e5ea",
              color: msg.role === "user" ? "white" : "black",
              padding: "8px 12px", borderRadius: 16, display: "inline-block"
            }}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Nhập tin nhắn..."
          style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 20px", borderRadius: 8, background: "#0084ff", color: "white", border: "none" }}>
          Gửi
        </button>
      </div>
    </div>
  );
}