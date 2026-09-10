const Feedback = require("../model/Feedback");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  lookup: (hostname, options, callback) =>
    dns.lookup(hostname, { family: 4 }, callback),
});

const sendFeedback = async (req, res) => {
  try {
    const { sender, email, message } = req.body;
    if (!sender || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const feedback = new Feedback({ sender, email, message });
    await feedback.save();

    await transporter.sendMail({
      from: `"Kestrel College" <${process.env.ORG_EMAIL}>`,
      to: process.env.EMAIL_USER,
      subject: `New Feedback ${sender}`,
      text: `From ${sender} (${email})\n\nMessage:\n${message}`,
    });

    res.status(200).json({ message: "Feedback sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error at feedback controller" });
  }
};

module.exports = { sendFeedback };
