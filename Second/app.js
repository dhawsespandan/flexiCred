const express = require('express')
const mongoose = require('mongoose');
const UserRoute = require('./routes/route');

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({ "message": "hello crud project for sit"});
});

mongoose.connect("mongodb://localhost:27017/usersDB")
.then(()=>console.log("Database connected successfully!"))
.catch(err => {
    console.log('Could not connect to database',err)
    process.exit();
})

app.use('/user',UserRoute)

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});
