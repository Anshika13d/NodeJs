const User = require('../models/user')

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id)
    
    if(!user){
        return res.status(404).json({ error:'user not found' })
    }
    return res.json(user);
}

async function handleUpdateUserById(req, res){
    await User.findByIdAndUpdate(req.params.id, { last_name: 'changed' })
    return res.json({ status: "Seccess" })
}

async function handleDeleteUserById(req, res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: 'user deleted'})
}

async function handleCreateNewUser(req, res){
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({msg: 'All fields are required!'});
    }

    try {
        const result = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            job_title: body.job_title,
            gender: body.gender,
        });
        // console.log("result", result);

        return res.status(201).json({msg: "success", id: result._id});
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            // Duplicate key error
            return res.status(400).json({msg: 'Email already exists!'});
        } else {
            // Other unexpected errors
            console.error("Error creating user:", error);
            return res.status(500).json({msg: 'Internal Server Error'});
        }
    }
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}