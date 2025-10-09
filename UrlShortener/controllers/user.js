const { v4: uuidv4 } = require('uuid')
const USER = require("../models/user");
const { setUser } = require('../service/auth')

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;

   await USER.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
};

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const correctUser = await USER.findOne({ email, password });
    if (!correctUser) return res.render("login", {
        error: "Invalid UserName or Password",
    });

    const sessionId = uuidv4();
    setUser(sessionId, correctUser);
    res.cookie('uid', sessionId);
    return res.redirect("/");
};

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}