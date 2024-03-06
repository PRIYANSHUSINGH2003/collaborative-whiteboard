const express = require("express");
const router = new express.Router();
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");



// register data
router.post("/signup", async (req, res) => {
    // console.log(req.body);
    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill the all data" })
        console.log("not data available");
    };

    try {
        const preuser = await USER.findOne({ email: email });
        if (preuser) {
            res.status(422).json({ error: "this user is already present" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password and cpassword not match" })
        } else {
            const finalUser = new USER({
                fname, email, password, cpassword
            });

            // incryption and decryption password
            // bcrypt.js
            // password hashing process 

            const storedata = await finalUser.save();
            console.log(storedata);
            res.status(201).json(storedata);
        }
    } catch (error) {

    }
})


// login user API
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the all data" })
    };
    try {
        const userlogin = await USER.findOne({ email: email });
        console.log(userlogin + "user value");

        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(userlogin + "pass match");

            //  token generate
            const token = await userlogin.generateAuthtoken();
            // console.log(token);
            res.cookie("Amazonweb", token, {
                expires: new Date(Date.now() + 9000000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: "invalid detials" })
            } else {
                res.status(201).json({ message: "Password match" })
            }
        } else {
            res.status(400).json({ error: "invalid detials" })
        }
    } catch (error) {
        res.status(400).json({ error: "invalid detials" })
    }
})


module.exports = router;