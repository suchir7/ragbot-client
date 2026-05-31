import { useState, useRef, useEffect } from "react";
import axios from "axios";

const API_URL = "https://ragbot-api-xczz.onrender.com";

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm the NovaDocs assistant. Ask me anything about the product!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/chat`, { message: userMessage });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: res.data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.avatar}>N</div>
            <div>
              <div style={styles.headerTitle}>NovaDocs Assistant</div>
              <div style={styles.headerSub}>Powered by AI</div>
            </div>
          </div>
          <div style={styles.onlineBadge}>● Online</div>
        </div>

        {/* Messages */}
        <div style={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.msgRow,
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.role === "assistant" && (
                <div style={styles.botAvatar}>N</div>
              )}
              <div
                style={{
                  ...styles.bubble,
                  ...(msg.role === "user"
                    ? styles.userBubble
                    : styles.botBubble),
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ ...styles.msgRow, justifyContent: "flex-start" }}>
              <div style={styles.botAvatar}>N</div>
              <div style={{ ...styles.bubble, ...styles.botBubble }}>
                <span style={styles.typing}>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={styles.inputRow}>
          <textarea
            style={styles.input}
            placeholder="Ask something about NovaDocs..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            style={{
              ...styles.sendBtn,
              opacity: loading || !input.trim() ? 0.5 : 1,
            }}
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    width: "420px",
    height: "620px",
    background: "#1e1e2e",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
    overflow: "hidden",
    border: "1px solid #2a2a3e",
  },
  header: {
    background: "linear-gradient(135deg, #6c63ff, #4facfe)",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#fff",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "15px",
  },
  headerSub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "11px",
    marginTop: "2px",
  },
  onlineBadge: {
    color: "#7fff7f",
    fontSize: "12px",
    fontWeight: "600",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "20px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  msgRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "8px",
  },
  botAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6c63ff, #4facfe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#fff",
    flexShrink: 0,
  },
  bubble: {
    maxWidth: "75%",
    padding: "10px 14px",
    borderRadius: "16px",
    fontSize: "14px",
    lineHeight: "1.5",
    wordBreak: "break-word",
  },
  userBubble: {
    background: "linear-gradient(135deg, #6c63ff, #4facfe)",
    color: "#fff",
    borderBottomRightRadius: "4px",
  },
  botBubble: {
    background: "#2a2a3e",
    color: "#e0e0e0",
    borderBottomLeftRadius: "4px",
    border: "1px solid #3a3a4e",
  },
  typing: {
    color: "#888",
    fontStyle: "italic",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    padding: "16px",
    borderTop: "1px solid #2a2a3e",
    background: "#1e1e2e",
  },
  input: {
    flex: 1,
    background: "#2a2a3e",
    border: "1px solid #3a3a4e",
    borderRadius: "12px",
    padding: "10px 14px",
    color: "#fff",
    fontSize: "14px",
    resize: "none",
    outline: "none",
    fontFamily: "'Segoe UI', sans-serif",
  },
  sendBtn: {
    background: "linear-gradient(135deg, #6c63ff, #4facfe)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "10px 18px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
};