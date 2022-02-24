const router = require('express').Router();
const User = require('../models/User');
const _ = require("lodash");
const bcrypt = require("bcrypt");

//Update user
router.put('/:id', async (req, res) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        { new: true }
    );

    const {password, ...others} = updatedUser._doc;
    res.status(200).json(others);
});

//delete user
router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if(!user) return res.status(404).json("the user was not found");

    res.status(200).json("The user with the given ID has been deleted");
})

//get a user
router.get('/find/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json("Not found");

    const {password, ...others} = user._doc;

    res.status(200).json(others);
})

//follow a user
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id){
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if (!user.followers.includes(req.body.userId)){
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: {followings: req.params.id} });

            res.status(200).json('user has been followed');
        } else {
            res.status(403).json('you already followed this user');
        }
    } else {
        res.status(403).json("You cant follow yourself");
    }
})

//unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id){
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if (user.followers.includes(req.body.userId)){
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: {followings: req.params.id} });

            res.status(200).json('user has been unfollowed');
        } else {
            res.status(403).json('you dont follow this user');
        }
    } else {
        res.status(403).json("You cant unfollow yourself");
    }
})

module.exports = router;