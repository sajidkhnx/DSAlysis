import React, { useEffect, useState } from "react";
import { useQuestions } from "../../QuestionsContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format, startOfWeek, startOfMonth } from "date-fns";


function aggregateByPeriod(history, periodFn, labelFormat) {
  const map = {};
  history.forEach(({ value, date }) => {
    if (value) { // Only count solved
      const d = new Date(date);
      const key = format(periodFn(d), labelFormat);
      map[key] = (map[key] || 0) + 1;
    }
  });
  return Object.entries(map).sort(([a], [b]) => new Date(a) - new Date(b));
}

export default function ProgressCharts() {
  const { questions } = useQuestions();
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const allHistory = questions.flatMap(q => q.solvedHistory || []);
    // Weekly
    const weekly = aggregateByPeriod(
      allHistory,
      d => startOfWeek(d, { weekStartsOn: 1 }),
      "yyyy-MM-dd"
    ).map(([dateStr, count]) => ({ week: dateStr, solved: count }));
    setWeeklyData(weekly);
    // Monthly
    const monthly = aggregateByPeriod(
      allHistory,
      d => startOfMonth(d),
      "yyyy-MM"
    ).map(([dateStr, count]) => ({ month: dateStr, solved: count }));
    setMonthlyData(monthly);
  }, [questions]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4 text-blue-700">Weekly Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="solved" fill="#2563eb" name="Solved" barSize={40} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4 text-green-700">Monthly Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="solved" fill="#34d399" name="Solved" barSize={40} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
