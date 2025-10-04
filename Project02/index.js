const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/project-02")
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log("Error while connecting", err));

// User DB Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});

// Mongoose model
const user = mongoose.model("user", userSchema);

// MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// HTML response
app.get('/users', async (req, res) => {
    const allDbUsers = await user.find({});
    const html = `<ul>${allDbUsers.map((user) => `<li>${user.firstName} ${user.lastName}</li>`).join("")}</ul>`
    return res.send(html);
});

// Api response
app.get('/api/users/', async (req, res) => {
    const users = await user.find({});
    return res.json(users);
});

// Create user in db
app.post('/api/users', async (req, res) => {
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
});

// Update user in db
app.patch('/api/users/:id', async (req, res) => {
    const { firstName, lastName } = req.body;
    const updatedUser = await user.findByIdAndUpdate(req.params.id,
        { firstName, lastName },   // only update provided fields
        { new: true, runValidators: true }
    );
    return res.status(202).json({ status: "Success", message: "Fields are updated", user: updatedUser })
});

// Delete user in db
app.delete('/api/users/:id', async (req, res) => {
    await user.findByIdAndDelete(req.params.id);
    return res.status(410).json({ status: "Success" })
});

app.listen(PORT, () => console.log(`Server is started on: ${PORT}`));


// 1. Require all dependencies like express, MONGOOSE, APP = EXPRESS.
// 2. Initialize MongoDB Connection.
// 3. Setup DB Schema.
// 4. Initialize Mongoose Model.
// 5. Initialize MiddleWare(urlencodded) for parsing html in body.
// 6. Get html response from db, using app.get and return html.
// 7. Get API response from db, return res.json.
// 8. Create data in db using app.post, check validation like (!body || !body.firstName).
// 9. update data in db using app.patch.
// 10. Delete data in db using app.delete.