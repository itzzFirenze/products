const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// get users
router.get('/', async (req, res) => {
   try {
      const users = await User.find({});
      return res.status(200).json({ data: users })
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
})

// get users by email
// router.get('/:email', async (req, res) => {  
//    try {
//       const users = await User.findOne({ email: req.params.email });
//       return res.status(200).json({ data: users })
//    } catch (error) {
//       return res.status(500).json({ message: error.message });
//    }
// })

// create user
router.post('/register', async (req, res) => {
   try {
      if (!req.body) {
         return res.status(400).json({ error: "User details are missing" });
      }
      const { name, email, password } = req.body;

      const users = await User.findOne({ email });
      if (users) {
         return res.status(400).json({ error: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // console.log(hashedPassword);
      const newUser = new User({
         name,
         email,
         password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).json({ message: "User created successfully", user: newUser });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
})

// login user
router.post('/login', async (req, res) => {
   try {
      if (!req.body) {
         return res.status(400).json({ error: "Email or password is missing" });
      }
      const { email, password } = req.body;
      const users = await User.findOne({ email });
      if (!users) {
         return res.status(400).json({ error: "User doesn't exist" });
      }
      const isPasswordValid = await bcrypt.compare(password, users.password);
      if (!isPasswordValid) {
         return res.status(400).json({ error: "Invalid user crendentials" });
      }

      // generate token
      const token = generateToken(users._id, 'user');
      res.cookie('token', token, {
         httpOnly: true,
      })
      return res.status(200).json({ message: "User logged in successfully" });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
})

module.exports = router;