const {User, Thoughts} = require('../models');

module.exports = {
    getUser(req, res) {
        User.find()
        .then((User) => res.json(User))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then((User) =>
        !User
        ? res.status(404).json({message: 'no user with that ID'})
        : res.json(User)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
        .then((User) => res.json(User))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((User) =>
        !User
        ? res.status(404).json({message:'no user with this ID!'})
        :res.json(User)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((User) =>
        !User
        ? res.status(404).json({message: 'no user with that ID!'})
        : Thoughts.deleteMany({_id: { $in: user.Thoughts }})
        )
        .then(() => res.json({ message: 'User and thought deleted!'}))
        .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$push: {friends: req.params.friendID}},
            {runValidators: true, new: true}
        )
        .then((User) => {
            !User
            ? res.status(404).json({ message: 'no user with that ID!'})
            : res.json(User);
        })
        .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndDelete(
            {_id: req.params.userId},
            { $pull: { friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((User) => {
            !User
            ? res.status(404).json({ message: 'no user with that ID!'})
            : res.json(User);
        })
        .catch((err) => res.status(500).json(err));
    }


};