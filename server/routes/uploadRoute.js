// routes/uploadRoute.js
console.log("Upload route loaded");
const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const Question = require("../models/Question"); // ✅ Your existing model

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const auth = require("../middleware/auth");

// Protected upload route: associates uploaded questions with the logged-in user
router.post("/", auth, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filePath = path.join(__dirname, "..", req.file.path);
  const py = spawn("python", ["python/clean_and_return.py", filePath]);

  let dataBuffer = "";
  let errorBuffer = "";

  py.stdout.on("data", (data) => {
    dataBuffer += data.toString();
  });

  py.stderr.on("data", (data) => {
    errorBuffer += data.toString();
    console.error("Python Error:", data.toString());
  });

  py.on("close", async (code) => {
    if (code !== 0 || errorBuffer) {
      fs.unlinkSync(filePath);
      return res.status(500).json({ error: "Python script failed", details: errorBuffer });
    }
    try {
      const rawData = JSON.parse(dataBuffer);

      // 🔄 Convert each row to match your schema, and add user field
      const cleanedData = rawData.map((row) => ({
        title: row.title || "",
        category: row.category || "",
        difficulty: row.difficulty || "",
        companyTags: row.companyTags 
          ? String(row.companyTags).split(/[;,|]/).map(tag => tag.trim()).filter(tag => tag.length > 0)
          : [],
        link: row.link || "",
        check: String(row.check).toLowerCase() === "true" || String(row.check).toLowerCase() === "1",
        user: req.user.id
      }));

      await Question.insertMany(cleanedData);
      fs.unlinkSync(filePath); // delete temp file

      res.json({
        message: "✅ Data inserted into MongoDB",
        count: cleanedData.length
      });
    } catch (err) {
      fs.unlinkSync(filePath);
      console.error("❌ Insert error:", err);
      res.status(500).json({ error: "Failed to insert data" });
    }
  });
});

module.exports = router;
