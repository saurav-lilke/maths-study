import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm Cybie's Helper. Ask me any math doubt from your study plan!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes("pythagoras")) {
      return "The Pythagorean theorem states that in a right-angled triangle, the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides: a² + b² = c².";
    }
    if (lowerInput.includes("algebra")) {
      return "Algebra is a branch of mathematics that uses symbols and letters to represent numbers and quantities in formulas and equations. It's all about finding the unknown!";
    }
    if (lowerInput.includes("mean")) {
      return "The mean is the average of a set of numbers. You calculate it by adding all the numbers together and then dividing by the count of those numbers.";
    }
    if (lowerInput.includes("circle") && lowerInput.includes("chord")) {
      return "A chord is a straight line segment whose endpoints both lie on the circle. A key property is that a perpendicular line from the center of a circle to a chord bisects the chord.";
    }
    if (lowerInput.includes("interest")) {
      return "Compound interest is interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods on a deposit or loan. The formula is A = P(1 + r/n)^(nt).";
    }
    return "I can help with topics like 'Pythagoras', 'algebra', 'mean', 'compound interest', and 'circle chords'. Try asking about one of those!";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const userMessage = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage = { sender: "bot", text: getBotResponse(inputValue) };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);

    setInputValue("");
  };
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-80 h-[28rem] z-50"
          >
            <div className="h-full flex flex-col rounded-2xl bg-gray-800/80 backdrop-blur-md border border-cyan-500/30 shadow-cyan-500/20 shadow-[0_0_20px_rgba(0,245,255,0.15)]">
              <div className="p-3 border-b border-cyan-500/30 text-center">
                <h3 className="font-bold text-cyan-300">Cybie's Helper</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "bot" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-2.5 rounded-lg ${
                        msg.sender === "bot"
                          ? "bg-cyan-900/50 text-cyan-200"
                          : "bg-pink-900/50 text-pink-200"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-cyan-500/30 flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a math doubt..."
                  className="flex-1 bg-gray-900/70 border border-cyan-500/30 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button
                  type="submit"
                  className="bg-cyan-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-cyan-400 shadow-[0_0_8px_rgba(0,245,255,0.5)] transition-all"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 bg-cyan-500 rounded-full text-white flex items-center justify-center z-50 shadow-[0_0_15px_rgba(0,245,255,0.7),0_0_30px_rgba(0,245,255,0.5)] hover:scale-110 transition-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
    </>
  );
};

export default Chatbot;
