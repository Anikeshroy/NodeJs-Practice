const express = require('express');
const router = express.Router();
const { handleGetAllUsers, handleCreateUsers, handleUpdateUsersById, handleDeleteUsersById } = require('../controllers/user')

router.route("/").get(handleGetAllUsers).post(handleCreateUsers)
router
    .route("/:id")
    .patch(handleUpdateUsersById)
    .delete(handleDeleteUsersById)

// Api response
router.get('/', async (req, res) => {
    const users = await user.find({});
    return res.json(users);
});

module.exports = router;