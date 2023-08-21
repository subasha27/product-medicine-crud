const express = require("express");
const mongoose = require("mongoose");
const AutoIncrementFactory = require('mongoose-sequence');
const route = require('./router/router');
const dotenv = require("dotenv").config();



const app = express();
app.use(express.urlencoded({extended:true}));
app.use('/api',route);
app.use(express.json());



mongoose.connect(
    'mongodb+srv://subash:atlas123@cluster0.yujnvsk.mongodb.net/mrmedProduct?retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)


const db = mongoose.connection;
const AutoIncrement = AutoIncrementFactory(db);
db.on('error',console.error.bind(console,'Connection error:'))
db.once('open',function(){
    console.log("Connected Successfully");
});


const PORT = process.env.PORT||1800;
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})
