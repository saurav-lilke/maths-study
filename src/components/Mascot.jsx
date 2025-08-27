import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Mascot = ({ completionPercentage, justCompleted }) => {
  const [message, setMessage] = useState("");
  const [expression, setExpression] = useState("^‿^");

  const encouragementMessages = [
    "Let's get started!",
    "You can do it!",
    "One topic at a time!",
    "Ready to learn something new?",
    "Let's crush this study plan!",
  ];

  const milestoneMessages = {
    25: "Great start! You're building momentum.",
    50: "Halfway there! You're doing amazing.",
    75: "Almost at the finish line! Keep going!",
    100: "Wow! You completed the whole plan! Incredible!",
  };

  const celebrationMessage = "Awesome work! Keep it up!";

  useEffect(() => {
    let messageTimeout;

    if (justCompleted) {
      setMessage(celebrationMessage);
      setExpression("🎉");
      messageTimeout = setTimeout(() => {
        updateMessageBasedOnProgress();
      }, 3000);
    } else {
      updateMessageBasedOnProgress();
    }

    return () => clearTimeout(messageTimeout);
  }, [justCompleted, completionPercentage]);

  const updateMessageBasedOnProgress = () => {
    let currentMilestone = 0;
    for (const percentage in milestoneMessages) {
      if (completionPercentage >= percentage) {
        currentMilestone = percentage;
      }
    }

    if (currentMilestone > 0 && completionPercentage < 100) {
      setMessage(milestoneMessages[currentMilestone]);
      setExpression("(ง'̀-'́)ง");
    } else if (completionPercentage === 100) {
      setMessage(milestoneMessages[100]);
      setExpression("🏆");
    } else {
      setMessage(
        encouragementMessages[
          Math.floor(Math.random() * encouragementMessages.length)
        ]
      );
      setExpression("^‿^");
    }
  };
  return (
    <div className="flex items-center gap-4 mt-6 p-4 bg-gray-900/50 rounded-lg border border-cyan-500/20">
      {/* Mascot SVG */}
      <div className="w-20 h-20 flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            {/* Body */}
            <path
              d="M25 90V50C25 44.4772 29.4772 40 35 40H65C70.5228 40 75 44.4772 75 50V90H25Z"
              fill="url(#bodyGradient)"
            />
            <path
              d="M25 90V50C25 44.4772 29.4772 40 35 40H65C70.5228 40 75 44.4772 75 50V90H25Z"
              stroke="#00f5ff"
              strokeWidth="2"
            />

            {/* Head */}
            <rect
              x="20"
              y="15"
              width="60"
              height="40"
              rx="10"
              fill="url(#headGradient)"
              stroke="#00f5ff"
              strokeWidth="2"
            />

            {/* Screen */}
            <rect x="28" y="23" width="44" height="24" rx="5" fill="#083344" />
            <text
              x="50"
              y="40"
              textAnchor="middle"
              fill="#00f5ff"
              fontSize="16"
              fontFamily="monospace"
              className="drop-shadow-[0_0_3px_rgba(0,245,255,0.7)]"
            >
              {expression}
            </text>

            {/* Antenna */}
            <line
              x1="50"
              y1="15"
              x2="50"
              y2="5"
              stroke="#00f5ff"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="5"
              r="3"
              fill="#00f5ff"
              className="shadow-[0_0_5px_#00f5ff]"
            />
          </motion.g>
          <defs>
            <linearGradient
              id="headGradient"
              x1="50"
              y1="15"
              x2="50"
              y2="55"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#0891b2" />
            </linearGradient>
            <linearGradient
              id="bodyGradient"
              x1="50"
              y1="40"
              x2="50"
              y2="90"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#67e8f9" />
              <stop offset="1" stopColor="#0e7490" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Message Bubble */}
      <div className="relative bg-cyan-900/50 p-3 rounded-lg border border-cyan-500/30 w-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-cyan-200 text-sm"
          >
            {message}
          </motion.p>
        </AnimatePresence>
        <div className="absolute top-1/2 -left-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-cyan-900/50 transform -translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default Mascot;
