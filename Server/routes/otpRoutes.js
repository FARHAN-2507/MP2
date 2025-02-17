const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const otpStorage = {}; // Temporary storage (use DB in production)

// 📌 API: Send OTP
router.post("/send-otp", async (req, res) => {
    const { phone } = req.body;

    if (!phone || !/^\d{10}$/.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    otpStorage[phone] = otp; // Store OTP temporarily

    try {
        await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${phone}`, // Assuming India (+91)
        });

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 API: Verify OTP
router.post("/verify-otp", (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ message: "Phone number and OTP are required" });
    }

    if (otpStorage[phone] !== otp) {
        return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    delete otpStorage[phone]; // Remove OTP after successful verification
    res.status(200).json({ message: "OTP verified successfully" });
});

module.exports = router;
