import React, { useState } from "react";
import axios from "axios";
import Navbar1 from "./Navbar1";

function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("dsa_jwt");
    await axios.post("https://dsalysis.onrender.com/api/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => alert("✅ Upload successful"))
      .catch(err => alert("❌ Upload failed"));
  };

  return (
    <>
    <Navbar1 />
    <title>Upload DSA Excel Sheet</title>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Upload DSA Excel Sheet</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          className="mb-4 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          onClick={handleUpload}
          disabled={!file}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition ${file ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
        >
          Upload Excel
        </button>
      </div>
    </div>
    </>
  );
}

export default Upload;
