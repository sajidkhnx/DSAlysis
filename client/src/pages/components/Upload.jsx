import React, { useState } from "react";
import axios from "axios";
import Navbar1 from "./Navbar1";

function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    setUploading(true);
    setProgress(0);
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("dsa_jwt");
    await axios.post("https://dsalysis.onrender.com/api/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      }
    })
      .then(res => {
        alert("✅ Upload successful");
      })
      .catch(err => {
        alert("❌ Upload failed");
      })
      .finally(() => {
        setUploading(false);
        setProgress(0);
      });
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
            disabled={uploading}
          />
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition ${file && !uploading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
          >
            {uploading ? 'Uploading...' : 'Upload Excel'}
          </button>
          {uploading && (
            <div className="w-full mt-4">
              <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-blue-500 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-blue-700 mt-1">{progress}%</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Upload;
