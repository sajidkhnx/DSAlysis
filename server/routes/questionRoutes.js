
const express = require("express");
const router = express.Router();
const Question = require("../models/Question");


const auth = require("../middleware/auth");

// Route to get all questions for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const questions = await Question.find({ user: req.user.id });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// (Optional) Route to get all questions for analytics/admin (not user-specific)
// router.get("/all", async (req, res) => {
//   const questions = await Question.find();
//   res.json(questions);
// });

module.exports = router;
// PATCH route to update 'check' field
router.patch('/:id', async (req, res) => {
  try {
    const { check } = req.body;
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      {
        $set: { check },
        $push: { solvedHistory: { value: check, date: new Date() } }
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Question not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});