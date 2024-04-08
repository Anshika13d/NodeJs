const express = require('express')
const urlRoute = require('./router/url')
const { connectToMongoDB } = require('./connect');

const app = express();
const PORT = 8003;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log('mongodb connected'));

app.use(express.json());
app.use("/url", urlRoute)

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));