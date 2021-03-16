const express = require('express')
const app = express()
const route=express.Router()
const User=require('../db/schema.js').User
const firebase= require('../db/db_connect.js')
const firestore = firebase.firestore();



//get a specific user
route.get('/user/:id',async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id)
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
        console.log(data)
        if(!data.exists) {
            res.status(404).send('User with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})


//create a user
route.post('/user',async (req,res,next)=>{
    try{ 
     const data = req.body;
     await firestore.collection('users').doc().set(data);
     res.send('user created successfully');
 } catch (error) {
     res.status(400).send(error);
 }
 })


 //update user
route.post('/update/:id',async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const student =  await firestore.collection('users').doc(id);
        await users.update(data);
        res.send('user updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//delete user
route.get('/delete',async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports=route