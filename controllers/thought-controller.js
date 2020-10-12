const {User, Thought} = require("../models");
console.log("in thought controller");

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

    // Create a new thought at api/thoughts/username/
    addThought({params, body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {username: params.username},
                    {$push: {thoughts: _id}},
                    {new: true}
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: "No user found with the given username."});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    // Delete a thought at api/thoughts/:id
    deleteThought({params}, res) {
        console.log("delete thought " + params.id)
        Thought.findOneAndDelete({_id: params.id})
            // .then(() => {
            //     return User.findOneAndUpdate(
            //         {username: params.username},
            //         {$pull: {thoughts: params.thoughtId}},
            //         {new: true}
            //     )
            // })
            // .then(dbUserData => {
            //     if(!dbUserData) {
            //         res.status(404).json({message: "No user found with the given username."});
            //         return;
            //     }
            //     res.json(dbUserData);
            // })
            .then(dbThoughtData => {
                console.log(dbThoughtData);
                if(!dbThoughtData) {
                    res.status(404).json({message: "No thought found with this id"});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    }
};

// const thoughtController = {

//     // Get all thoughts at api/thoughts
//     getAllThoughts(req, res) {
//         Thought.find({})
//             .populate({
//                 path: "users",
//                 select: "username"
//             })
//             .select("-__v")
//             .then(dbThoughtData => res.json(dbThoughtData))
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json(err);
//             });
//     },

//     // Get a single thought by id at api/thoughts/:_id
//     getThoughtById({params}, res) {
//         Thought.findOne({_id: params.id})
//             .populate({
//                 path: "users",
//                 select: "username"
//             })
//             .select("-__v")
//             .then(dbThoughtData => {
//                 if(!dbThoughtData) {
//                     res.status(404).json({message: "No thought found with this id."});
//                     return;
//                 }
//                 res.json(dbThoughtData)
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json(err);
//             });
//     },

//     // Post a new thought at api/thoughts
//     addThought({params, body}, res) {
//         Thought.create(body) 
//             // Update the user's profile to include the new thought
//             .then(({_id}) => {
//                 return User.findOneAndUpdate(
//                     {_id: params.userId},
//                     {$push: {thoughts: _id}},
//                     {new: true}
//                 );
//             })
//             .then(dbThoughtData => {
//                 if(!dbThoughtData) {
//                     res.status(404).json({message: "No user found with this id."});
//                     return;
//                 }
//                 res.json(dbThoughtData);
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.json(err);
//             });
//     },

//     updateThought({params, body}, res) {
//         Thought.findByIdAndUpdate({_id: params.thoughtId})
//             .then(updatedThought => {
//                 if(!updatedThought) {
//                     res.status(404).json({message: "No thought found with this id."});
//                     return;
//                 }
//                 return User.findOneAndDelete(
//                     {_id: params.userId},
//                     {$pull: {thoughts: params.thoughtId}},
//                     {new: true}
//                 )
//             })
//             .then(dbUserData => {
//                 if(!dbUserData) {
//                     res.status(404).json({message: "No user found with this id."})
//                     return;
//                 }
//                 return User.findOneAndUpdate(
//                     {_id: params.userId},
//                     {$push: {thoughts: _id}},
//                     {new: true}
//                 );
//             })
//             .then(dbUserData => {
//                 if(!dbUserData) {
//                     res.status(404).json({message: "No user found with this id."})
//                     return;
//                 }
//                 res.json(dbUserData);
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.json(err);
//             });
//     },

//     deleteThought({params}, res) {
//         Thought.findOneAndDelete({_id: params.thoughtId})
//             .then(deletedThought => {
//                 if(!deletedThought) {
//                     res.status(404).json({message: "No thought found with this id."});
//                     return;
//                 }
//                 return deletedThought;
//                 // return User.findOneAndUpdate(
//                 //     {_id: params.userId},
//                 //     {$pull: {thoughts: params.thoughtId}},
//                 //     {new: true}
//                 // )
//             })
//             // .then(dbUserData => {
//             //     if(!dbUserData) {
//             //         res.status(404).json({message: "No user found with this id."})
//             //         return;
//             //     }
//             //     res.json(dbUserData);
//             // })
//             .catch(err => {
//                 console.log(err);
//                 res.json(err);
//             });
//     }
// }

module.exports = thoughtController;