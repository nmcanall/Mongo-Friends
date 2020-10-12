const {User, Thought} = require("../models");

const thoughtController = {

    // Get all thoughts at api/thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select("-__v")
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    // Get a single thought by ID at api/thoughts/:thoughtId
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.thoughtId})
            .select("-__v")
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    // Create a new thought at api/thoughts/:username/
    addThought({params, body}, res) {
        // Add the appropriate username to the body based on input from the URL query
        body.username = params.username;
        User.findOne({username: params.username})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: "No user found with the given username."});
                    return;
                }
                // Since the username exists, build the thought; add username to the body
                Thought.create(body) 
                    .then(({_id}) => {
                        return User.findOneAndUpdate(
                            {username: params.username},
                            {$push: {thoughts: _id}},
                            {new: true}
                        );
                    })
                    .then(dbUserData => res.json(dbUserData))
                    .catch(err => {
                        console.log(err);
                        res.json(err);
                    });
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    // Add a reaction at api/thoughts/:thoughtId/reactions
    addReaction({params, body}, res) {
        console.log(body);
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({message: "No thought found with this id!"});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    // Update a thought at api/thoughts/:thoughtId
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true, runValidators: true})
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({message: "No thought found with this ID"});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete a thought at api/thoughts/:thoughtId
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    {username: dbThoughtData.username},
                    {$pull: {thoughts: params.thoughtId}},
                    {new: true}
                )
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    // Delete a reaction at api/thoughts/:thoughtId/:reactionId
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
            .then(dbThoughtData => {
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    }
};

module.exports = thoughtController;