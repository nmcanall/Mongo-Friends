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
    .route("/:thoughtId")
    .get(getThoughtById);

router
    .route("/:userId")
    .post(addThought);

router  
    .route("/:userId/:thoughtId")
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;