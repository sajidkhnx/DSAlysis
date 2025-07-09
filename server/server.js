console.log("Server.js loaded, cwd:", process.cwd());
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://dsalysis.vercel.app",
      "https://ds-alysis.vercel.app"
    ];
    // Allow all Vercel preview URLs (*.vercel.app)
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/ds-alysis-[a-z0-9-]+-sajidkhnxdev07-gmailcoms-projects\.vercel\.app$/.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// DB Connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
// Routes
app.use("/api/upload", require("./routes/uploadRoute"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});