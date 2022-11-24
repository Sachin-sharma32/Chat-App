const express = require("express");
const router = express.Router();
const {
    updateUser,
    deleteUser,
    getAllUsers,
} = require("../controllers/userController");

router.route("/:id").patch(updateUser).delete(deleteUser);
router.route("/").get(getAllUsers);

module.exports = router;
