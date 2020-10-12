const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thought-controller");

router
    .route("/")
    .get(getAllThoughts);

router
    .route("/:username")
    .post(addThought);

router
    .route("/:thoughtId")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route("/:thoughtId/reactions")
    .put(addReaction)

router 
    .route("/:thoughtId/:reactionId")
    .put(deleteReaction);

module.exports = router;