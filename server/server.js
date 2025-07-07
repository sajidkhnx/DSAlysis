console.log("Server.js loaded, cwd:", process.cwd());
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Middleware
app.use(cors({
  origin: "https://dsalysis.vercel.app",  // Update with your Vercel frontend URL
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