// const mongoose = require('mongoose');
// const User=require('../models/user')

// const register=async(req,res,next)=>{
//        try {
//         const newuser=new User({
//             name:req.body.name,
//             email:req.body.email,
//             password:req.body.password
//         });
//         const sprKorisnika= await newuser.save()
//         res.json(sprKorisnika)
//         res.status(200).send("User created")  
//        } catch (err) {
//             next(err)
//        }
// }

// const login=async(req,res)=>{

//     const {email,password}=req.body;

//     try {
//         const user=await User.findOne({email:email,password:password})
//         if(user){
//             res.send(user)
//         }
//         else{
//             return res.status(400).json("Login failed")
//         }
//     } catch (error) {
//         return res.status(400).json({error})
//     }
// }
// module.exports = { login, register };