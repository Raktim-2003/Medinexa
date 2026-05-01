import { useState } from "react";
import { useNavigate } from "react-router-dom";
import robot from "../assets/assets_frontend/robot.jpg";

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi 👋 I'm Medinexa AI. How can I help you?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const suggestions = [
    "Find a doctor",
    "Book appointment",
    "Emergency ambulance",
    "Contact support",
  ];

  // 🔥 SMART ACTIONS
  const handleSmartActions = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("doctor")) {
      navigate("/doctors");
      return "Opening doctors page 👨‍⚕️ ";
    }

    if (text.includes("appointment")) {
      navigate("/");
      return "You can book appointments from here 👨‍⚕️";
    }

    if (text.includes("ambulance")) {
      navigate("/Ambulance");
      return "Opening ambulance services 🚑";
    }

    if (text.includes("contact")) {
      navigate("/contact");
      return "Taking you to contact page 📞";
    }

    return null;
  };

  // 🔥 BACKEND API CALL
  const getAIReply = async (userMsg) => {
    try {
      const res = await fetch("http://localhost:4000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      return data.reply || "No response from AI";
    } catch (error) {
      console.error(error);
      return "⚠️ Unable to connect. Try again.";
    }
  };

  const sendMessage = async (msg) => {
    const userMessage = msg || input;
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");
    setLoading(true);

    const smartReply = handleSmartActions(userMessage);
    if (smartReply) {
      setMessages((prev) => [...prev, { text: smartReply, sender: "ai" }]);
      setLoading(false);
      return;
    }

    const reply = await getAIReply(userMessage);

    setMessages((prev) => [...prev, { text: reply, sender: "ai" }]);
    setLoading(false);
  };

  return (
    <>
      {/* FLOAT BUTTON WITH ROBOT */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 
        w-16 h-16 rounded-2xl shadow-lg cursor-pointer 
        hover:scale-110 transition overflow-hidden
        bg-gradient-to-r from-blue-600 to-purple-600 
        flex items-center justify-center
        shadow-[0_0_20px_rgba(99,102,241,0.6)]"
      >
        <img
          src={robot}
          alt="AI"
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* PANEL */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[340px] h-[500px] 
        bg-white rounded-2xl shadow-2xl border flex flex-col z-50">

          {/* HEADER WITH ROBOT */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 
          text-white p-4 rounded-t-2xl flex justify-between items-center">

            <div className="flex items-center gap-3">
              <img
                src="/robot.jpg"
                alt="AI"
                className="w-10 h-10 rounded-full bg-white p-1"
              />

              <div>
                <p className="font-semibold text-sm">Medinexa AI</p>
                <p className="text-xs opacity-80">Smart Assistant</p>
              </div>
            </div>

            <span
              onClick={() => setOpen(false)}
              className="cursor-pointer text-lg"
            >
              ✖
            </span>
          </div>

          {/* CHAT */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-gray-400">Typing...</div>
            )}
          </div>

          {/* SUGGESTIONS */}
          <div className="p-3 flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1 border rounded-full hover:bg-gray-100"
              >
                {s}
              </button>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 border rounded-full px-3 py-1 text-sm outline-none"
            />
            <button
              onClick={() => sendMessage()}
              className="bg-blue-600 text-white px-3 rounded-full"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;