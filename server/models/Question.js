const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
  title: String,
  category: String,
  difficulty: String,
  companyTags: [String],
  link: String,
  check: Boolean,
  solvedHistory: [
    {
      value: Boolean, // true for solved, false for unsolved
      date: { type: Date, default: Date.now }
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
module.exports = mongoose.model("Question", QuestionSchema);