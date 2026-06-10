const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const verifyToken = require("../middleware/verifyToken");

//CREATE POST
router.post("/", verifyToken, async (req,res)=>{
   // 作者一律取自 token，忽略 client 傳來的 username，避免冒名發文
   const newPost = new Post({ ...req.body, username: req.user.username });
   try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

   }catch(err){
    res.status(500).json(err);
   }
});

//UPDATE POST
router.put("/:id", verifyToken, async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.user.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("You can update only your post!");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id", verifyToken, async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.user.username){
            try{
                await post.delete();
                res.status(200).json("Post has been deleted...");
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("You can delete only your post!");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL POSTS
router.get("/", async (req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    const limit = parseInt(req.query.limit) || 8; 
    const skip = parseInt(req.query.skip) || 0;
    // const skip = res.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0
    try{
        let posts;
        if(username){
            posts = await Post.find({username});
        } else if(catName){
            posts = await Post.find({
                categories:{
                    $in: [catName],
                },
            // },undefined, {skip, limit: 4});
                }).skip(skip).limit(limit).sort({createdAt: -1});
        } else{
            // posts = await Post.find({},undefined, {skip, limit: 4});
            posts = await Post.find().skip(skip).limit(limit).sort({createdAt: -1});
        }
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router