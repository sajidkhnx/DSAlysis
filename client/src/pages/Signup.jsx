import React, { useState } from "react";
import Navbar1 from "./components/Navbar1";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.confirm) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch("https://dsalysis.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || data.error || "Signup failed");
        setSuccess("");
        return;
      }
      setSuccess("Signup successful! You can now log in.");
      setError("");
      setForm({ email: "", password: "", confirm: "" });
    } catch (err) {
      setError("Network error. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1e293b] to-[#172554] flex flex-col">
      <Navbar1 />
      <div className="flex-1 flex flex-col items-center justify-center px-2 py-6">
        <div className="perspective-3d w-full flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-gradient-to-br from-[#1e293b] to-[#312e81] rounded-3xl shadow-2xl border border-blue-900/30 backdrop-blur-md bg-opacity-90 p-10 flex flex-col gap-8 relative overflow-hidden transform-gpu transition-transform duration-700 hover:-rotate-y-6 hover:scale-105"
            style={{ perspective: '1200px' }}
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-700 opacity-30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-700 opacity-30 rounded-full blur-2xl animate-pulse" />
            <h2 className="text-3xl font-extrabold text-center text-blue-100 mb-2 tracking-tight drop-shadow-lg">Create Account</h2>
            <p className="text-blue-300 text-center mb-2">Sign up for DSAlytics and start tracking your progress</p>
            {error && <div className="text-red-400 text-center font-semibold animate-shake">{error}</div>}
            {success && <div className="text-green-400 text-center font-semibold animate-fade-in">{success}</div>}
            <div className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="bg-blue-950/60 border border-blue-800 rounded-xl px-4 py-3 text-white placeholder:text-blue-300 focus:ring-2 focus:ring-blue-400 focus:bg-blue-900/40 transition-all shadow-inner"
                autoFocus
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="bg-blue-950/60 border border-blue-800 rounded-xl px-4 py-3 text-white placeholder:text-blue-300 focus:ring-2 focus:ring-blue-400 focus:bg-blue-900/40 transition-all shadow-inner"
              />
              <input
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={handleChange}
                className="bg-blue-950/60 border border-blue-800 rounded-xl px-4 py-3 text-white placeholder:text-blue-300 focus:ring-2 focus:ring-blue-400 focus:bg-blue-900/40 transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-bold shadow-xl transition-all duration-200 scale-100 hover:scale-105 tracking-wide"
            >
              Sign Up
            </button>
            <div className="text-center text-blue-300 mt-2">
              Already have an account?{' '}
              <a href="/login" className="text-pink-400 hover:underline font-semibold">Log in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
