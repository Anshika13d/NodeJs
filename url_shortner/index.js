const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const { connectToMongoDB } = require('./connect');
const {restrictedToLoggedInUserOnly, checkAuth} = require('./middleware/auth')
const URL = require('./Model/url')

const urlRoute = require('./router/url')
const staticRoute = require('./router/staticRouter')
const userRoute = require('./router/user');

const app = express();
const PORT = 8003;

connectToMongoDB("mongodb://127.0.0.1:27017/shortie-url").then(() => console.log('mongodb connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./View'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictedToLoggedInUserOnly, urlRoute)
app.use('/user', userRoute)
app.use('/', checkAuth, staticRoute)

// app.get('/', (req, res) => {
//     res.render('home')
// })



//using ejs
// app.get('/test', async(req, res) =>{
//     const allUrls = await URL.find();
//     return res.render('home', {
//         urls: allUrls
//     })
// })

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory: {
                    timestamp: Date.now()
                },
            },
        }
    );
    res.redirect(entry.redirectUrl)
})

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));