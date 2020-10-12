const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought
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

module.exports = router;