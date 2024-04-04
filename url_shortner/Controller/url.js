const shortid = require('shortid')
const URL = require('../Model/url')

async function handleGenerateNewShortUrl(req, res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error: 'Url is required'})
    }

    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID });
}

module.exports = {
    handleGenerateNewShortUrl,
}