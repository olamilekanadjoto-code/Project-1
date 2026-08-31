const mongoose = require("mongoose");

const FeedBackSchema = mongoose.Schema(
  {
    sender: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

const Feedback = mongoose.model("Feedback", FeedBackSchema);
module.exports = Feedback;
