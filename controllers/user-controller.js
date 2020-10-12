const {User} = require("../models");

const userController = {

    // Get all users at api/users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: "thought",
                select: "-__v"
            })
            .select("-__v")
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get a single user by username at api/users/:username
    getUserById({params}, res) {
        User.findOne({username: params.username})
            .populate({
                path: "thought",
                select: "-__v"
            })
            .select("-__v")
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: "No user found with this username"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });

    },

    // Post a new user at api/users
    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Edit a user by username at api/users/:username
    updateUser({params, body}, res) {
        User.findOneAndUpdate({username: params.username}, body, {new: true, runValidators: true})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: "No user found with this username"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete a user by username at api/users/:username
    deleteUser({params}, res) {
        User.findOneAndDelete({username: params.username})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: "No user found with this username"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }

}

module.exports = userController;