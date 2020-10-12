const router = require("express").Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/user-controller");

// Set up GET all and POST at /api/users
router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

// Routes at /api/users/:username
router
    .route("/:username")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// Routes at /api/users/:username/friends
router
    .route("/:username/friends")
    .put(addFriend);

// Routes at /api/users/username/friendUsername
router
    .route("/:username/:friendUsername")
    .put(deleteFriend);

module.exports = router;