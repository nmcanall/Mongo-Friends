const router = require("express").Router();

const {
    getAllThoughts,
    addThought,
    deleteThought
} = require("../../controllers/thought-controller");

router
    .route("/")
    .get(getAllThoughts);

router
    .route("/:username")
    .post(addThought);

router
    .route("/:id")
    .delete(deleteThought);

// const {
//     getAllThoughts, 
//     getThoughtById, 
//     addThought, 
//     updateThought,
//     deleteThought
// } = require("../../controllers/thought-controller");

// router
//     .route("/")
//     .get(getAllThoughts);

// router 
//     .route("/:thoughtId")
//     .get(getThoughtById);

// router
//     .route("/:userId")
//     .post(addThought);

// router  
//     .route("/:thoughtId")
//     .put(updateThought)
//     .delete(deleteThought);

module.exports = router;