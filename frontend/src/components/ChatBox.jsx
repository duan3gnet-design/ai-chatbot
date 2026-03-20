import { useState, useEffect, useCallback, useRef } from "react";
import { SystemLoading } from "./Loading";
import { LoadingButton } from "./LoadingButton";

const STATUS = { loading: "loading", ok: "ok", error: "error" };

function useHealthCheck(services) {
  const [results, setResults] = useState(
    services.map((s) => ({ ...s, status: STATUS.loading, ms: null }))
  );

  const runCheck = useCallback(async () => {
    setResults(
      services.map((s) => ({ ...s, status: STATUS.loading, ms: null })),
    );
    await Promise.all(
      services.map(async (service, i) => {
        const start = Date.now();
        try {
          const res = await fetch(service.url);
          const ms = Date.now() - start;
          setResults((prev) =>
            prev.map((r, idx) =>
              idx === i
                ? { ...r, status: res.ok ? STATUS.ok : STATUS.error, ms }
                : r,
            ),
          );
        } catch {
          setResults((prev) =>
            prev.map((r, idx) =>
              idx === i
                ? { ...r, status: STATUS.error, ms: Date.now() - start }
                : r,
            ),
          );
        }
      }),
    );
  }, [services]);

  return { runCheck, healthCheckResults: results };
}

export default function ChatBox() {
  //http://localhost:8000
  //https://ai-chatbot-l9e4.onrender.com
  const chatUrl = "https://ai-chatbot-l9e4.onrender.com";
  const SERVICES = [{ name: "API Gateway", url: chatUrl + "/health" }];
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const { runCheck, healthCheckResults } = useHealthCheck(SERVICES);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const intervalRef = useRef(null);
  const sendButtonRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current == null) {
      setLoading(true);
      intervalRef.current = setInterval(runCheck, 2000);
    }
  }, [healthCheckResults, runCheck]);

  useEffect(() => {
    if (healthCheckResults.every((item) => item.status == "ok")) {
      clearInterval(intervalRef.current);
      setLoading(false);
    }
  }, [healthCheckResults]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const newHistory = [...history, userMsg];
    var limit = 3;

    if (newHistory.length < limit * 2) {
      setSending(true)
      const res = await fetch(`${chatUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history }),
      });

      const data = await res.json();
      const botMsg = { role: "assistant", content: data.reply };

      setHistory([...newHistory, botMsg]);
      setInput("");
      setSending(false)
    } else alert(`Exceeded the limit of ${limit} queries.`);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      {loading && <SystemLoading size={36} color="#6366f1" />}
      {!loading && (
        <>
          <div
            style={{
              height: 400,
              overflowY: "auto",
              border: "1px solid #ccc",
              padding: 10,
              borderRadius: 8,
            }}
          >
            {history.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.role === "user" ? "right" : "left",
                  margin: "8px 0",
                }}
              >
                <span
                  style={{
                    background: msg.role === "user" ? "#0084ff" : "#e5e5ea",
                    color: msg.role === "user" ? "white" : "black",
                    padding: "8px 12px",
                    borderRadius: 16,
                    display: "inline-block",
                  }}
                >
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendButtonRef.current.click()}
              placeholder="Input message..."
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
              disabled={sending}
            />
            <LoadingButton
              ref={sendButtonRef}
              variant="primary"
              loadingText="Sending message..."
              successText="Sent!"
              onClick={sendMessage}
            >
              Send
            </LoadingButton>
          </div>
        </>
      )}
    </div>
  );
}
