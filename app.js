const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const app =express()
const port=process.env.PORT
const db=require('./db/db_connect.js')


//using middlewares to handle requestes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/crud',require('./routes/crud.js'))


//starting the server up
app.listen(port,()=>{
    console.log('server is up on '+port)
})