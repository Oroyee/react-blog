const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

//REGISTER（需登入才能建立新帳號 — 防止任何人從公開端點自行註冊）
router.post("/5j4hk4", verifyToken, async (req,res)=>{
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        const {password, ...others} = user._doc;
        res.status(200).json(others)
    } catch(err){
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        // !user && res.status(400).json("Wrong credentials!");
        if(!user){
            return res.status(400).json("Wrong credentials!");
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        // !validated && res.status(400).json("Wrong credentials");
        if(!validated){
            return res.status(400).json("Wrong credentials");
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const {password, ...others} = user._doc;

        res.status(200).json({ ...others, token });
    }catch (err){
        res.status(500).json(err);
    }
});

module.exports = router
