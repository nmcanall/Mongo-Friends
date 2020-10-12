const router = require("express").Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../../controllers/user-controller");

// Set up GET all and POST at /api/users
router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

// Setup GET on, PUT and DELETE methods at /api/users/id
router
    .route("/:username")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;