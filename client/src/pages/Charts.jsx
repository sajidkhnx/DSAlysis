import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Navbar1 from "./components/Navbar1";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { RadarChart } from '@mui/x-charts/RadarChart';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ProgressCharts from "./components/ProgressCharts";
import { QuestionsProvider } from "../QuestionsContext";
import DailyActivityHeatmap from "./components/DailyActivityHeatmap";


export default function Charts() {

  const [categoryData, setCategoryData] = useState([]);
  const [solvedPieData, setSolvedPieData] = useState([]);
  const [categorySolvedData, setCategorySolvedData] = useState([]);
  const [categoryUnsolvedData, setCategoryUnsolvedData] = useState([]);
  const [difficultyByCategory, setDifficultyByCategory] = useState([]);
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("dsa_jwt");
    axios.get("http://localhost:5000/api/questions", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      // Count questions by category
      const counts = {};
      // Count solved/unsolved
      let solved = 0;
      let unsolved = 0;
      // Count solved/unsolved by category
      const solvedByCategory = {};
      const unsolvedByCategory = {};

      // Difficulty by category aggregation (case-insensitive)
      const diffCat = {};
      // Company-wise aggregation
      const companyCounts = {};
      res.data.forEach(q => {
        // Category count
        if (q.category) {
          counts[q.category] = (counts[q.category] || 0) + 1;
        }
        // Solved/Unsolved count
        if (q.check === true) {
          solved++;
          // Solved by category
          if (q.category) {
            solvedByCategory[q.category] = (solvedByCategory[q.category] || 0) + 1;
          }
        } else {
          unsolved++;
          // Unsolved by category
          if (q.category) {
            unsolvedByCategory[q.category] = (unsolvedByCategory[q.category] || 0) + 1;
          }
        }
        // Difficulty by category
        if (q.category && q.difficulty) {
          const diff = q.difficulty.trim().toLowerCase();
          if (!diffCat[q.category]) {
            diffCat[q.category] = { Easy: 0, Medium: 0, Hard: 0 };
          }
          if (diff === 'easy') diffCat[q.category].Easy++;
          else if (diff === 'medium') diffCat[q.category].Medium++;
          else if (diff === 'hard') diffCat[q.category].Hard++;
        }
        // Company-wise aggregation (split on whitespace, comma, semicolon, or pipe)
        if (Array.isArray(q.companyTags)) {
          q.companyTags.forEach(tag => {
            if (tag && typeof tag === 'string' && tag.trim() !== '') {
              tag.split(/[,;|\s]+/).forEach(singleTag => {
                const cleanTag = singleTag.trim();
                if (cleanTag) {
                  companyCounts[cleanTag] = (companyCounts[cleanTag] || 0) + 1;
                }
              });
            }
          });
        }
      });
      // Prepare data for Recharts
      setCategoryData(Object.entries(counts).map(([category, count]) => ({ category, count })));
      setSolvedPieData([
        { name: 'Solved', value: solved },
        { name: 'Unsolved', value: unsolved }
      ]);
      setCategorySolvedData(Object.entries(solvedByCategory).map(([category, solved]) => ({ category, solved })));
      setCategoryUnsolvedData(Object.entries(unsolvedByCategory).map(([category, unsolved]) => ({ category, unsolved })));
      // Difficulty by category for grouped bar chart
      setDifficultyByCategory(Object.keys(diffCat).map(cat => ({
        category: cat,
        Easy: diffCat[cat].Easy,
        Medium: diffCat[cat].Medium,
        Hard: diffCat[cat].Hard
      })));
      // Company bar chart
      const sortedCompanies = Object.entries(companyCounts).sort((a, b) => b[1] - a[1]);
      setCompanyData(sortedCompanies.slice(0, 10).map(([company, questions]) => ({ company, questions })));
    });
  }, []);
   // miui start
  const commonSettings = {
  height: 300,
  radar: {
    max: 120,
    metrics: ['Math', 'Chinese', 'English', 'Geography', 'Physics', 'History'],
  },
};
const lisaGrades = {
  type: 'radar',
  label: 'Lisa',
  data: [120, 98, 86, 99, 85, 65],
  hideMark: false,
};
const bartGrades = {
  type: 'radar',
  label: 'Bart',
  data: [25, 34, 51, 16, 90, 20],
  hideMark: false,
};
    const [hideMark, setHideMark] = React.useState(false);
  const [fillArea, setFillArea] = React.useState(false);

  const withOptions = (series) =>
    series.map((item) => ({ ...item, hideMark, fillArea }));
  // miui end

  // Pie chart colors (vivid, colorful palette)
  const pieColors = [
    '#2563eb', // blue
    '#34d399', // green
    '#f87171', // red
    '#fbbf24', // yellow
    '#a78bfa', // purple
    '#f472b6', // pink
    '#facc15', // gold
    '#60a5fa', // light blue
    '#f59e42', // orange
    '#10b981', // teal
    '#e11d48', // rose
    '#6366f1', // indigo
    '#f43f5e', // pink-red
    '#22d3ee', // cyan
    '#c026d3', // fuchsia
    '#84cc16', // lime
    '#f97316', // orange
    '#0ea5e9', // sky
    '#a3e635', // light green
    '#eab308', // amber
  ];

  return (
    <QuestionsProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1e293b] to-[#172554]">
        <Navbar1 />
        <div className="max-w-7xl mx-auto py-10 px-2 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
            <h2 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">DSA Analytics Dashboard</h2>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            <div className="bg-gradient-to-r from-[#1e293b] to-[#2563eb] text-white rounded-xl px-6 py-3 shadow-lg font-semibold text-lg flex flex-col items-center min-w-[120px] border border-blue-900/40 backdrop-blur-md bg-opacity-80">
                <span className="text-2xl font-bold drop-shadow">{categoryData.reduce((a, b) => a + b.count, 0)}</span>
                <span className="text-xs uppercase tracking-wide">Total Questions</span>
              </div>
            <div className="bg-gradient-to-r from-[#0f172a] to-[#0ea5e9] text-white rounded-xl px-6 py-3 shadow-lg font-semibold text-lg flex flex-col items-center min-w-[120px] border border-cyan-900/40 backdrop-blur-md bg-opacity-80">
                <span className="text-2xl font-bold drop-shadow">{solvedPieData[0]?.value || 0}</span>
                <span className="text-xs uppercase tracking-wide">Solved</span>
              </div>
            <div className="bg-gradient-to-r from-[#312e81] to-[#64748b] text-white rounded-xl px-6 py-3 shadow-lg font-semibold text-lg flex flex-col items-center min-w-[120px] border border-indigo-900/40 backdrop-blur-md bg-opacity-80">
                <span className="text-2xl font-bold drop-shadow">{solvedPieData[1]?.value || 0}</span>
                <span className="text-xs uppercase tracking-wide">Unsolved</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center border border-blue-200 w-full">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Questions by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {categoryData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center border border-green-200 w-full">
              <h3 className="text-xl font-semibold mb-4 text-green-700">Solved vs Unsolved</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={solvedPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {solvedPieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Mastery Progress Bars */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center border border-blue-200 mb-12">
            <h3 className="text-xl font-semibold mb-6 text-indigo-700">Category Mastery</h3>
            <div className="w-full max-w-2xl flex flex-col gap-4">
              {categoryData.map(({ category, count }) => {
                const solved = (categorySolvedData.find(c => c.category === category)?.solved) || 0;
                const percent = count > 0 ? Math.round((solved / count) * 100) : 0;
                return (
                  <div key={category} className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-blue-900">{category}</span>
                      <span className="text-blue-500 font-semibold">{solved} / {count} solved</span>
                    </div>
                    <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden">
                      <div
                        className="h-4 rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 to-pink-400 shadow-inner transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="text-right text-xs text-blue-400 mt-1">{percent}% mastered</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center border border-indigo-200">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">Solved Questions by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categorySolvedData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="solved" fill="#2563eb" name="Solved" barSize={40} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center border border-indigo-200">
              <h3 className="text-lg font-semibold mb-4 text-red-700">Unsolved Questions by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryUnsolvedData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="unsolved" fill="#f87171" name="Unsolved" barSize={40} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center mt-6 border border-slate-200">
            <h3 className="text-lg font-semibold mb-4 text-purple-700">Difficulty vs Categories</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={difficultyByCategory} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Easy" fill="#22d3ee" name="Easy" barSize={30} radius={[8, 8, 0, 0]} />
                <Bar dataKey="Medium" fill="#fbbf24" name="Medium" barSize={30} radius={[8, 8, 0, 0]} />
                <Bar dataKey="Hard" fill="#f87171" name="Hard" barSize={30} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center mt-10 border border-indigo-200">
            <h3 className="text-lg font-semibold mb-4 text-pink-700">Questions by Company (Top 10)</h3>
            <ResponsiveContainer width="100%" height={Math.max(350, companyData.length * 40)}>
              <BarChart data={companyData} layout="vertical" margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="questions" tick={{ fontSize: 12 }} allowDecimals={false} />
                <YAxis type="category" dataKey="company" tick={{ fontSize: 12 }} width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="questions" fill="#ec4899" name="Questions" barSize={40} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
            <ProgressCharts />
            <DailyActivityHeatmap />
          </div>
        </div>
        <footer className="w-full text-center text-xs text-blue-200 py-4 mt-8 border-t border-blue-900 bg-[#0a192f] bg-opacity-95">Made with ❤️ by Sajid • DSAlytics © {new Date().getFullYear()}</footer>
      </div>
    </QuestionsProvider>
  );
}
