
import express from "express";
import bcrypt from "bcryptjs";
import Customer from "../models/Customer.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";

const router = express.Router();

const otpStore = new Map(); 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (password.length < 6)
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await Customer.findOne({ email: normalizedEmail });

    if (existing)
      return res.status(409).json({
        message: "Email already registered lol bro",
      });

   
    const otp = String(randomInt(100000, 1000000)); //oto thikka oto . 

    otpStore.set(normalizedEmail, { //map
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, //dosh minite 
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password: await bcrypt.hash(password, 10),
    }); 


    //send otp to email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: normalizedEmail,
      subject: "Cafe Email Verification",
      text: `Your Cafe verification code is ${otp}. It expires in 10 minutes.`,
    });

    res.status(200).json({
      message: "Verification code sent to your email",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not send verification email" });
  }
});

// Verify email and create customer account
router.post("/verify-email", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({
        message: "Email and OTP are required",
      });

    const normalizedEmail = email.trim().toLowerCase();
    const savedOTP = otpStore.get(normalizedEmail);

    if (!savedOTP)
      return res.status(400).json({
        message: "Please sign up again to get a verification code",
      });

    if (Date.now() > savedOTP.expiresAt) {
      otpStore.delete(normalizedEmail);
      return res.status(400).json({
        message: "OTP expired. Please sign up again",
      });
    }

    if (String(otp) !== savedOTP.otp)
      return res.status(400).json({
        message: "Invalid OTP",
      });

    const customer = await Customer.create({
      name: savedOTP.name,
      email: savedOTP.email,
      phone: savedOTP.phone,
      password: savedOTP.password,
    });

    otpStore.delete(normalizedEmail);

    res.status(201).json({
      message: "Email verified and registration successful",
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
    });
  } catch (err) {
    console.error(err);

    if (err.code === 11000)
      return res.status(409).json({
        message: "Email already registered",
      });

    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const customer = await Customer.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!customer) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      customer.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        customerId: customer._id.toString(),
        email: customer.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
