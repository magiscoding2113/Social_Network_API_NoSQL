//api/thoughts





//api/thoughts/:thoughtId/reactions

const mongoose = require('mongoose');
const {Thoughts, User, thoughts} = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
        .then((Thoughts) => res.json((Thoughts)))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThoughts(req, res) {
        Thoughts.findOne({ _id: req.params.userId})
        .select('-__v')
        .then((Thoughts) =>
        !Thoughts 
        ? res.status(404).json({ message: 'no thought with that ID!'})
        : res.json(Thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThoughts(req, res) {
        Thoughts.create(req.body)
        .then((Thoughts) => {
            return User.findOneAndUpdate(
                { username: req.body.username},
                { $push: {thoughts: thoughts._id}},
                {runValidators: true, new:true}
            );
        })
        .then((User) => res.json(User))
        .catch((err) => req.status(500).json(err));
    },
    removeThoughts(req, res) {
        Thoughts.findOneAndDelete({_id: req.params.thoughtsId})
        .then((Thoughts) =>
        !Thoughts
        ? res.status(404).json({ message: "no thought with that ID!"})
        : User.findOneAndUpdate(
            { username: Thoughts.username},
            { $pull: {thoughts: req.params.thoughtsId}},
            {new: true}
        )
        )
        .then((User) =>
        !User
        ? res.status(404).json({
            message: "thought deleted but no user found"
        })
        : res.json({message: 'Thought succesfully deleted'})
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateThoughts(req, res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtsId},
            { $set: req.body},
            { runValidators: true, new: true}
        )
        .then((Thoughts) =>
        !Thoughts
        ? res.status(404).json({ message: "no thought with that ID!"})
        : res.json(Thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId},
            { $push: { reactions: req.body}},
            { runValidators: true, new: true}
        )
        .then((Thoughts) => {
            !Thoughts 
            ? res.status(404).json({ message: "no thought with that ID!"})
            : res.json(Thoughts);
        })
        .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId},
            { $pull: {reactions: { reactionId: req.params.reactionId}}},
            { runValidators: true, new: true}
        )
        .then((Thoughts) => {
            !Thoughts
            ? res.status(404).json({ message: "no thought with that ID!"})
            : res.json(Thoughts);
        })
        .catch((err) => res.status(500).json(err));
    },

};
