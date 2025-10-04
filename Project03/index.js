const express = require('express');
const {connectMongoDb} = require('./connection')
const userRouter = require("./routes/user")
const { logreqres } = require('./middlewares')

const app = express();
const PORT = 8000;

// MongoDB Connection
connectMongoDb("mongodb://127.0.0.1:27017/project-03")

// MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(logreqres("log.txt"));

//routes
app.use("/api/users", userRouter)

//server
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