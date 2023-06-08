const express = require("express")
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

//REGISTER
router.post("/register", async (req, res) => {

    const runde = 10
    const passHash = await bcrypt.hash(req.body.password, runde)

    const newUser = new User({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        birthdate:req.body.birthdate,
        email: req.body.email,
        password: passHash
        
    });
    console.log(newUser)
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
})

//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(401).json("User not found")

        const isPassword = await bcrypt.compare(req.body.password, user.password)
        if (!isPassword) return res.status(401).json("Wrong password or username")
        const tokenacces = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "1d" })
        const { password, ...info } = user._doc;

        res.cookie("acces_token", tokenacces, {
            httpOnly: true
        }).status(200).json({ ...info });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong." })
    }
})

module.exports = router;