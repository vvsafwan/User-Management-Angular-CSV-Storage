const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./route/userRoute');

app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',userRoute);

app.listen(5000,()=>{
    console.log("The server started running");
});