import React from "react";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import axios from "axios";

const categoryChartData = [
  ["Category", "Count"],
  ["Array", 50],
  ["DP", 30],
  ["Graph", 20],
];

const progressChartData = [
  ["Date", "Solved"],
  ["2025-06-01", 2],
  ["2025-06-02", 3],
  ["2025-06-03", 5],
  ["2025-06-04", 4],
  ["2025-06-05", 6],
];


const HomeUI = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1e293b] to-[#172554] text-white p-0 flex flex-col">
      <header className="relative text-center py-16 md:py-24 overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-700 opacity-30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-700 opacity-30 rounded-full blur-3xl animate-pulse" />
        </div>
        <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold drop-shadow-xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">Visualize. Track. Master DSA.</h1>
        <p className="relative z-10 mt-4 text-lg md:text-2xl text-blue-200 max-w-2xl mx-auto animate-fade-in delay-100">Upload your DSA sheet, track your coding progress, and crack the interview with data-driven insights.</p>
        <div className="relative z-10 mt-8 flex flex-wrap gap-4 justify-center animate-fade-in delay-200">
          {/* <Link to="/signup" className="bg-gradient-to-r from-blue-700 to-blue-400 text-white px-8 py-3 rounded-xl shadow-xl font-semibold text-lg hover:from-blue-800 hover:to-blue-500 border border-blue-500/30 transition-all duration-200 scale-100 hover:scale-105">Get Started</Link> */}
          <Link to="/upload" className="border border-blue-400 text-blue-200 px-8 py-3 rounded-xl hover:bg-blue-900/30 hover:text-white transition-all duration-200 scale-100 hover:scale-105 font-semibold text-lg">Upload Sheet</Link>
        </div>
      </header>
      <section className="py-12 max-w-5xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2">
        <div className="p-8 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-2xl border border-blue-900/30 backdrop-blur-md bg-opacity-90 hover:scale-[1.03] transition-transform duration-200">
          <h3 className="font-bold text-xl mb-2">📊 Progress Tracking</h3>
          <p>Visualize your daily, weekly, and monthly question-solving activity.</p>
        </div>
        <div className="p-8 bg-gradient-to-br from-[#312e81] to-[#0a192f] rounded-2xl shadow-2xl border border-indigo-900/30 backdrop-blur-md bg-opacity-90 hover:scale-[1.03] transition-transform duration-200">
          <h3 className="font-bold text-xl mb-2">🧠 Topic & Company Insights</h3>
          <p>See which companies ask what topics most often and track your strengths.</p>
        </div>
        <div className="p-8 bg-gradient-to-br from-[#0f172a] to-[#2563eb] rounded-2xl shadow-2xl border border-blue-900/30 backdrop-blur-md bg-opacity-90 hover:scale-[1.03] transition-transform duration-200">
          <h3 className="font-bold text-xl mb-2">✅ Mark Questions Solved</h3>
          <p>Update your progress in real-time with one-click checkboxes.</p>
        </div>
        <div className="p-8 bg-gradient-to-br from-[#1e293b] to-[#312e81] rounded-2xl shadow-2xl border border-indigo-900/30 backdrop-blur-md bg-opacity-90 hover:scale-[1.03] transition-transform duration-200">
          <h3 className="font-bold text-xl mb-2">📥 Upload Your Sheet</h3>
          <p>Import CSV or Excel DSA question sheets directly and manage your journey.</p>
        </div>
      </section>

      <section className="py-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 p-8 shadow-2xl rounded-2xl text-center border border-blue-400/40 backdrop-blur-md bg-opacity-95 hover:scale-[1.03] transition-transform duration-200">
          <h3 className="text-xl font-semibold text-blue-100">📋 Total Questions Tracked</h3>
          <p className="text-3xl mt-2 font-extrabold text-white drop-shadow">350+</p>
        </div>
        <div className="bg-gradient-to-br from-green-700 via-emerald-500 to-green-300 p-8 shadow-2xl rounded-2xl text-center border border-green-300/40 backdrop-blur-md bg-opacity-95 hover:scale-[1.03] transition-transform duration-200">
          <h3 className="text-xl font-semibold text-green-50">📈 Solved / Day</h3>
          <p className="text-3xl mt-2 font-extrabold text-white drop-shadow">8</p>
        </div>
        <div className="bg-gradient-to-br from-pink-700 via-fuchsia-600 to-purple-400 p-8 shadow-2xl rounded-2xl text-center border border-pink-300/40 backdrop-blur-md bg-opacity-95 hover:scale-[1.03] transition-transform duration-200">
          <h3 className="text-xl font-semibold text-pink-50">🏆 Top Company</h3>
          <p className="text-3xl mt-2 font-extrabold text-white drop-shadow">Amazon</p>
        </div>
      </section>

      <section className="py-12 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0a192f] p-8 rounded-2xl shadow-2xl border border-blue-900/30 backdrop-blur-md bg-opacity-90 hover:scale-[1.03] transition-transform duration-200">
          <h3 className="font-bold text-lg mb-2">📊 Questions by Category</h3>
          <Chart
            chartType="PieChart"
            data={categoryChartData}
            width="100%"
            height="300px"
            options={{
              is3D: true,
              colors: ["#60a5fa", "#818cf8", "#facc15"],
            }}
          />
        </div>

        <div className="bg-gradient-to-br from-[#0f172a] to-[#2563eb] p-8 rounded-2xl shadow-2xl border border-blue-900/30 backdrop-blur-md bg-opacity-90 hover:scale-[1.03] transition-transform duration-200">
          <h3 className="font-bold text-lg mb-2">📅 Weekly Progress</h3>
          <Chart
            chartType="LineChart"
            data={progressChartData}
            width="100%"
            height="300px"
            options={{
              hAxis: { title: "Date" },
              vAxis: { title: "Solved" },
              legend: "none",
              colors: ["#34d399"],
            }}
          />
        </div>
      </section>

      <footer className="w-full text-center text-xs text-blue-200 py-4 mt-8 border-t border-blue-900 bg-[#0a192f] bg-opacity-95">
        Made with <span className="text-pink-400">❤️</span> by Sajid • DSAlytics © 2025
      </footer>
    </div>
  );
};

export default HomeUI;