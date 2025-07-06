import React from "react";
import Navbar1 from "./components/Navbar1";

export default function Profile() {
  // Get user email from JWT (decode or from localStorage if you store it)
  let email = "";
  try {
    const token = localStorage.getItem("dsa_jwt");
    if (token) {
      // JWT is in format header.payload.signature, payload is base64 encoded
      const payload = JSON.parse(atob(token.split('.')[1]));
      email = payload.email;
    }
  } catch {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1e293b] to-[#172554] flex flex-col">
      <Navbar1 />
      <div className="flex-1 flex flex-col items-center justify-center px-2 py-10">
        <div className="bg-gradient-to-br from-[#1e293b] to-[#312e81] rounded-3xl shadow-2xl border border-blue-900/30 backdrop-blur-md bg-opacity-90 p-10 flex flex-col gap-6 items-center w-full max-w-md">
          <img
            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${email || 'user'}`}
            alt="User avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-400 shadow mb-4"
          />
          <h2 className="text-2xl font-bold text-blue-100 mb-2">User Profile</h2>
          <div className="text-blue-300 text-lg font-mono">{email || 'Unknown user'}</div>
          <div className="text-blue-400 text-sm">Welcome to your DSAlytics dashboard!</div>
        </div>
      </div>
    </div>
  );
}
