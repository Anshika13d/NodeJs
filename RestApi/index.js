const express = require('express');
const fs = require('fs')

// const users = require('./MOCK_DATA.json')

const userRouter = require("./routes/user");
const { connectMonogDb } = require('./connection');
const { logReqRes } = require('./middlewares')

const app = express();
const PORT = 8000;


//connection
connectMonogDb("mongodb://127.0.0.1:27017/youtube-app-1").then(() => console.log('mongoDb connected'))
    

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes('log.txt'))

app.use((req, res, next) => {
    console.log('mid 1');
    req.myUsrName = 'anshika'
    next();
    //return res.json({ msg: "hello from me" })
})

app.use((req,res,next) =>{
    console.log('mid  2', req.myUsrName);
    next();
    //return res.end('end')
})




//routes
app.use('/api/users', userRouter)










//we will make a hybrid server which means that this server can also be run on mobiles and on web
//on mobile html doc will be rendered and on laptop, json data will be displayed or rendered;

//in browser in large devices: 
//will return the json data
// app.get("/api/users", async (req, res) => {
//     const allDbUsers = await User.find({})
//     //res.setHeader("X-nameMy", "anshika")
//     return res.json(allDbUsers);
// })

// //in mobile phones
// //will return the html doc
// app.get('/users', async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `<ul>
//                     ${allDbUsers.map((user) => `<li> ${user.first_name} - ${user.email} </li> `).join("")} <li></li>
//                   </ul>`
//     res.send(html);
// });


// app
//     .route('/api/users/:id')
//     .get(async (req, res) => {
//         const user = await User.findById(req.params.id)
//         // const id = Number(req.params.id)
        
//         // const user = users.find((user) => user.id === id);
//         if(!user){
//             return res.status(404).json({ error:'user not found' })
//         }
//         return res.json(user);
//     })
//     .patch(async (req, res) => {
//         await User.findByIdAndUpdate(req.params.id, { last_name: 'changed' })
//         return res.json({ status: "Seccess" })
//     })
//     .delete(async (req, res) => {
//         await User.findByIdAndDelete(req.params.id)


//         // const id = Number(req.params.id);
//         // const index = users.find((user) => users.id === id);

//         // if(index !== -1){
//         //     users.splice(index, 1)
//         //     return res.json({ status: 'user deleted'})
//         // }
//         // else{
//         //     return res.status(404).json({error: 'some error occured'})
//         // }

//         return res.json({ status: 'user deleted'})
//     })

// app.post('/api/users', async (req, res) => {
//     const body = req.body;
//     if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
//         return res.status(400).json({msg: 'All fields are required!'});
//     }

//     try {
//         const result = await User.create({
//             first_name: body.first_name,
//             last_name: body.last_name,
//             email: body.email,
//             job_title: body.job_title,
//             gender: body.gender,
//         });
//         // console.log("result", result);

//         return res.status(201).json({msg: "success"});
//     } catch (error) {
//         if (error.code === 11000 && error.keyPattern && error.keyValue) {
//             // Duplicate key error
//             return res.status(400).json({msg: 'Email already exists!'});
//         } else {
//             // Other unexpected errors
//             console.error("Error creating user:", error);
//             return res.status(500).json({msg: 'Internal Server Error'});
//         }
//     }
// });



    // users.push({...body, id: users.length+1})
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({status: "Pending", id: users.length})
    // })






app.listen(PORT, () => console.log(`Server Has Started at port = ${PORT}`));
 