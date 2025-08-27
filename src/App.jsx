import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Button } from "./components/UI.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Mascot from "./components/Mascot.jsx";
import studyPlan, { sections } from "./data/studyPlan.jsx";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

export default function App() {
  const [day, setDay] = useState(0);
  const [completedDays, setCompletedDays] = useState([]);
  const [justCompleted, setJustCompleted] = useState(false);

  const toggleCompletion = (dayIndex) => {
    const isNowCompleting = !completedDays.includes(dayIndex);
    setCompletedDays((prev) =>
      isNowCompleting ? [...prev, dayIndex] : prev.filter((d) => d !== dayIndex)
    );
    if (isNowCompleting) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 3000);
    }
  };

  const progressData = useMemo(() => {
    return sections.map((section) => {
      const total = studyPlan.filter((s) => s.section === section).length;
      const completed = studyPlan.filter(
        (s, idx) => s.section === section && completedDays.includes(idx)
      ).length;
      return { section, total, completed };
    });
  }, [completedDays]);

  const completionPercentage = useMemo(
    () => (completedDays.length / studyPlan.length) * 100,
    [completedDays]
  );

  const currentDayData = studyPlan[day];
  return (
    <div className="min-h-screen bg-gray-900 font-sans p-4 sm:p-6 flex items-center justify-center text-gray-200">
      <div className="absolute inset-0 z-0 bg-grid-cyan-500/10 [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-start z-10"
      >
        {/* Study Plan Card */}
        <Card>
          <CardContent>
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-cyan-300 drop-shadow-[0_0_5px_rgba(0,245,255,0.7)]">
              ICSE Class IX Maths 14-Day Study Plan
            </h1>
            <div className="text-center mb-6 p-4 bg-cyan-900/30 rounded-lg border border-cyan-500/30">
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-300">
                Day {currentDayData.day}: {currentDayData.topic}
              </h2>
              <p className="text-sm text-cyan-400/70 mt-1">
                Section: {currentDayData.section}
              </p>
            </div>

            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {currentDayData.details.map((detail, index) => (
                <li key={index} className="pl-2">
                  {detail}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
              <Button
                onClick={() =>
                  setDay((day - 1 + studyPlan.length) % studyPlan.length)
                }
              >
                Previous
              </Button>
              <Button
                onClick={() => toggleCompletion(day)}
                variant={
                  completedDays.includes(day) ? "destructive" : "default"
                }
              >
                {completedDays.includes(day)
                  ? "Mark as Incomplete"
                  : "Mark as Completed"}
              </Button>
              <Button onClick={() => setDay((day + 1) % studyPlan.length)}>
                Next
              </Button>
            </div>

            <Mascot
              completionPercentage={completionPercentage}
              justCompleted={justCompleted}
            />
          </CardContent>
        </Card>

        {/* Progress Bar Chart Card */}
        <Card>
          <CardContent>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-cyan-300 drop-shadow-[0_0_5px_rgba(0,245,255,0.7)]">
              Study Progress by Section
            </h2>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart
                data={progressData}
                margin={{ top: 5, right: 20, left: 0, bottom: 80 }}
              >
                <defs>
                  <filter
                    id="glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0, 245, 255, 0.2)"
                />
                <XAxis
                  dataKey="section"
                  angle={-35}
                  textAnchor="end"
                  height={100}
                  interval={0}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis allowDecimals={false} tick={{ fill: "#9ca3af" }} />
                <Tooltip
                  cursor={{ fill: "rgba(0, 245, 255, 0.1)" }}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    borderColor: "rgba(0, 245, 255, 0.5)",
                    borderRadius: "8px",
                    color: "#e5e7eb",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  wrapperStyle={{ paddingBottom: "20px" }}
                />
                <Bar
                  dataKey="total"
                  fill="#ec4899"
                  name="Total Chapters"
                  radius={[4, 4, 0, 0]}
                  shape={(props) => <rect {...props} filter="url(#glow)" />}
                />
                <Bar
                  dataKey="completed"
                  fill="#00f5ff"
                  name="Completed"
                  radius={[4, 4, 0, 0]}
                  shape={(props) => <rect {...props} filter="url(#glow)" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <Chatbot />
    </div>
  );
}
