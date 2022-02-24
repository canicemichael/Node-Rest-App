const router = require('express').Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
})

//update a post
router.put('/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        { new:true }
    );

    if(!post) return res.status(404).json("the post with the ID was not found");

    res.status(200).json(post);
});

//delete a post
router.delete('/:id', async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id);

    if(!post) return res.status(404).json("the post with the given ID was not found");

    res.status(200).json("The post with the given ID has been deleted");
})

//like a post
router.put('/:id/like', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("post with the given ID was not found");

    if(!post.likes.includes(req.body.userId)){
        await post.updateOne({ $push: {likes: req.body.userId} });
        res.status(200).json("this post has been liked");
    } else {
        await post.updateOne({ $pull: {likes: req.body.userId}});
        res.status(200).json("this post has been unliked");
    }
})

//get a post
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json("the post was not found");

    res.status(200).json(post);
})

//get all posts from a timeline
router.get("/timeline/all", async (req, res) => {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
        })
    );
    res.json(userPosts.concat(...friendPosts));
})

module.exports = router;