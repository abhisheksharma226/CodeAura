const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//singup route
router.post("/signup", async(req, res) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName || !email || !password){
        res.status(400).json({message: "All fields are required"});
    }

    const existingUser = await User.findOne({ email });
    if(existingUser){
        res.status(400).json({message: "User already exists"});
    }

    const hashed  = await bcrypt.hash(password, 10);

    const user = new User({firstName, lastName, email, password: hashed});
    await user.save();
    
    res.status(201).json({message: "User created successfully", user});
})

module.exports = router;