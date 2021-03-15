const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const app =express();
const port=process.env.PORT


//using middlewares to handle requestes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//starting the server up
app.listen(port,()=>{
    console.log('server is up on '+port)
})