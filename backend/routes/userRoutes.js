const express=require("express")
const router=express.Router()
const User=require('../models/user')
const bcrypt = require('bcrypt');
const verify=require('./verifyToken')


//UPDATE
router.put("/:id", verify ,async (req,res)=>{
    if(req.user.id === req.params.id){
        if(req.body.password){

            const runde = 10
            const passHash = await bcrypt.hash(req.body.password, runde)

            req.body.password =passHash
        }

        try {
            const updatedUser=await User.findByIdAndUpdate(req.user.id,{$set:req.body})
            res.status(200).json(updatedUser)
            
        } catch (error) {
            res.status(500).json("Unlucky")
        }
    }
    else{
        res.status(403).json("You can update only your account")
    }
} )


//GET
router.get("/getallusers",async (req,res)=>{
    try {
        const users=await User.find()
        res.send(users)
    } catch (err) {
        console.error(err);
    return res.status(400).json({ message: "Error: " + err.message })
    }
})

module.exports=router;