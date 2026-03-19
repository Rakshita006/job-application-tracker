import express from 'express';
import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // ✅ added
import auth from '../middleware/auth.js';

const router = express.Router();


// ✅ REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ message: "All three fields are required" });
    }

    const check = await userModel.findOne({ email });

    if (check) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: 'require both email and password' });
    }

    const check = await userModel.findOne({ email });

    if (!check) {
      return res.json({ message: 'user not found please sign in first' });
    }

    const isMatch = await bcrypt.compare(password, check.password);

    if (!isMatch) {
      return res.json({ message: 'invalid details' });
    }

    const token = jwt.sign(
      { id: check._id }, // ✅ fixed
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ PROFILE (PROTECTED ROUTE)
router.get('/profile',auth, async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { name, email },
      { new: true }
    );
    

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;