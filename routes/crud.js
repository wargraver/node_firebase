const express = require('express')
const app = express()
const route=express.Router()
const User=require('../db/schema.js').User
const firebase= require('../db/db_connect.js')
const firestore = firebase.firestore();


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



//get a specific user
route.get('/user/:firstname',async (req, res, next) => {
    try {
        const firstname = req.params.firstname;
        const user = await firestore.collection('users').doc(firstname);
        const data = await user.get();
        if(!data.exists) {
            res.status(404).send('User with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})



module.exports=route