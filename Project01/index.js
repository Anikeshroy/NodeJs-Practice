const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fs = require("fs");
const PORT = 8000;

//connection
mongoose.connect("mongodb://127.0.0.1:27017/project-01")
    .then(() => console.log("MongoDb Connected"))
    .catch((err) => console.log("Mongo error", err));

//schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
})

const User = mongoose.model("user", userSchema);

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    fs.appendFile("log.txt", `\n${Date.now()}: ${req.method}: ${req.path}: ${req.ip}`, (err, data) => {
        next();
    });
});

//rest api
app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    res.setHeader("X-myName", "Anikesh Roy")
    return res.json(allDbUsers)
})

//html response
app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>${allDbUsers.map((user) => `<li>${user.firstName} - ${user.lastName}</li>`).join("")
        }</ul>
    `
    return res.send(html)
})

//api response
app.route('/api/users/:id')
    .get(async (req, res) => {
        // Get the users with ID
        const user = await User.findById(req.params.id);
        res.send(user);
    }).delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({ status: "success" });
    }).patch(async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
        return res.json({ status: "success" });
    });

//create new users with post
app.post('/api/users', async (req, res) => {
    const body = req.body
    if (!body || !body.email || !body.first_name || !body.last_name || !body.gender || !body.job_title) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    console.log("result", result);
    return res.status(201).json({ status: "success" });
});

//server starting port
app.listen(PORT, () => console.log(`Server is started on Port: ${PORT}`))