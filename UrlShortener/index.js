const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const connectMongoDB = require('./connect');
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth')
const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8000;

connectMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('MongoDb is connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuth); 

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", staticRoute);
app.use("/user", checkAuth, userRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now(), }
        },
    },
        { new: true });

    if (!entry) {
        // No URL found for this shortId
        return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`));