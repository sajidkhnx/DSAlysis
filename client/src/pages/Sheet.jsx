import React from "react";
import { useQuestions, QuestionsProvider } from "../QuestionsContext";
import Navbar1 from "./components/Navbar1";

function SheetInner() {
  const { questions, fetchQuestions } = useQuestions();

  // Toggle solved status
  const handleToggleSolved = async (id, current) => {
    try {
      const token = localStorage.getItem("dsa_jwt");
      await fetch(`http://localhost:5000/api/questions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ check: !current })
      });
      fetchQuestions(); // Refresh questions and progress
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  // Filter questions
  // const filteredQuestions = questions.filter(q => q.check === true);
  // const UnfilteredQuestions = questions.filter(q => q.check === false);

  const categoryMap = {};
  questions.forEach((q) => {
    if (!categoryMap[q.category]) {
      categoryMap[q.category] = { solved: 0, unsolved: 0 };
    }
    if (q.check === true) {
      categoryMap[q.category].solved++;
    } else {
      categoryMap[q.category].unsolved++;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1e293b] to-[#172554] text-white">
      <Navbar1 />
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-8 lg:px-12">
        <h1 className="text-4xl font-extrabold text-center tracking-tight mb-10 bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent drop-shadow-xl">DSAlytics (DSA + Analytics)</h1>
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0a192f] rounded-2xl shadow-2xl p-8 border border-blue-900/30 backdrop-blur-md bg-opacity-90 mt-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-200 tracking-wide">DSA Sheet :</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-900/20 rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-900 to-indigo-900/80">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                    Difficulty
                  </th>
                  {/* <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Company
                  </th> */}
                  <th className="px-4 py-2 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                    Link
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                    Solved?
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-br from-[#0a192f] to-[#1e293b] divide-y divide-blue-900/10">
                {questions.map((q) => (
                  <tr
                    key={q._id}
                    className="hover:bg-blue-900/30 transition duration-150"
                  >
                    <td className="px-4 py-2 whitespace-nowrap font-medium text-blue-100">
                      {q.title}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-blue-200">
                      {q.category}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={
                          q.difficulty === "Easy"
                            ? "bg-green-900/20 text-green-300 px-2 py-1 rounded-full text-xs font-semibold"
                            : q.difficulty === "Medium"
                            ? "bg-yellow-900/20 text-yellow-200 px-2 py-1 rounded-full text-xs font-semibold"
                            : "bg-red-900/20 text-red-300 px-2 py-1 rounded-full text-xs font-semibold"
                        }
                      >
                        {q.difficulty}
                      </span>
                    </td>
                    {/* <td className="px-4 py-2 whitespace-nowrap text-blue-200">
                      {q.companyTags.join(", ")}
                    </td> */}
                    <td className="px-4 py-2 whitespace-nowrap">
                      <a
                        href={q.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:underline hover:text-blue-200 transition"
                      >
                        View
                      </a>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap cursor-pointer" onClick={() => handleToggleSolved(q._id, q.check)}>
                      {q.check ? (
                        <span className="bg-green-700/30 text-green-200 px-2 py-1 rounded-full text-xs font-semibold hover:bg-green-600/40 transition">
                          Yes
                        </span>
                      ) : (
                        <span className="bg-red-700/30 text-red-200 px-2 py-1 rounded-full text-xs font-semibold hover:bg-red-600/40 transition">
                          No
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sheet() {
  return (
    <QuestionsProvider>
      <SheetInner />
    </QuestionsProvider>
  );
}
