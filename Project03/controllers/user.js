const user = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDbUsers = await user.find({});
    const html = `<ul>${allDbUsers.map((user) => `<li>${user.firstName} ${user.lastName}</li>`).join("")}</ul>`
    return res.send(html);
};

async function handleCreateUsers(req, res) {
    const body = req.body;
    if (!body || !body.firstName || !body.lastName) {
        return res.status(400).json({ message: "All fields are required!" })
    };

    const result = await user.create({
        firstName: body.firstName,
        lastName: body.lastName,
    });
    console.log(result);
    return res.status(201).json({ status: "Success", user: result });
};

async function handleUpdateUsersById(req, res) {
    const { firstName, lastName } = req.body;
    const updatedUser = await user.findByIdAndUpdate(req.params.id,
        { firstName, lastName },   // only update provided fields
        { new: true, runValidators: true }
    );
    return res.status(202).json({ status: "Success", message: "Fields are updated", user: updatedUser })
};

async function handleDeleteUsersById(req, res) {
    await user.findByIdAndDelete(req.params.id);
    return res.status(410).json({ status: "Success" })
};

module.exports = {
    handleGetAllUsers,
    handleCreateUsers,
    handleUpdateUsersById,
    handleDeleteUsersById,
};