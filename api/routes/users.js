const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/verifyToken");

//UPDATE
router.put("/:id", verifyToken, async (req,res)=>{
    if(req.user.id === req.params.id){
        // 只更新有提供且非空的欄位，避免空字串覆蓋既有資料（含密碼）
        const updates = {};
        if(req.body.username) updates.username = req.body.username;
        if(req.body.email) updates.email = req.body.email;
        if(req.body.profilePic) updates.profilePic = req.body.profilePic;
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
            {
                $set: updates,
            },
            {new:true}
        );
            const {password, ...others} = updatedUser._doc;
            res.status(200).json(others);
        } catch(err){
            res.status(500).json(err);
        }
    } else{
        res.status(401).json("You can update only your account!");
    }
});

//DELETE
router.delete("/:id", verifyToken, async (req,res)=>{
    if(req.user.id === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            try{
                await Post.deleteMany({username:user.username});
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted...");
            } catch(err){
                res.status(500).json(err);
            }
        }catch(err){
            res.status(404).json("User not found!");
        }
    } else{
        res.status(401).json("You can delete only your account!");
    }
});

//GET USER
router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router
