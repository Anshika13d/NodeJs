const {v4: uuidv4} = require('uuid');
const {setUser} = require('../service/auth')

const User = require('../Model/user');

async function handleUserSignUp(req, res){
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    })

    return res.redirect('/home');
}

async function handleUserLogin(req, res){
    const { email, password } = req.body;
    const user = await User.findOne({email, password});
    console.log('User'. user);
    if(!user){
        return res.render("login", {
            error: "username or password wrong"
        })
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);

    return res.redirect('/');
}



module.exports = {
    handleUserSignUp,
    handleUserLogin,
}