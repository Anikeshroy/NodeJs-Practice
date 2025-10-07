const express = require('express');
const connectMongoDB = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const path = require('path');
const staticRoute = require('./routes/staticRouter')
const app = express();
const PORT = 8000;

connectMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('MogoDb is connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", staticRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() }
        },
    },
        { new: true });

    res.redirect(entry.redirectUrl);
})

app.use('/url', urlRoute);

app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`));