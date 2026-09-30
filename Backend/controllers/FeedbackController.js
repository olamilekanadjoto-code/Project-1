const Feedback = require("../model/Feedback");
const nodemailer = require("nodemailer");

const sendFeedback = async (req, res) => {
  try {
    const { sender, email, message } = req.body;
    if (!sender || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const feedback = new Feedback({ sender, email, message });
    await feedback.save();

    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Kestrel College <onboarding@resend.dev>",
        to: [process.env.EMAIL_USER],
        reply_to: email,
        subject: `New Feedback ${sender}`,
        text: `From ${sender} (${email})\n\nMessage:\n${message}`,
      }),
    }).catch((err) => console.error("Email failed:", err.message));

    res.status(200).json({ message: "Feedback sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error at feedback controller" });
  }
};

module.exports = { sendFeedback };
