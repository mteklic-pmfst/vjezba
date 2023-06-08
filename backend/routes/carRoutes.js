const express=require("express");
const router=express.Router();

const Car=require('../models/car')

router.get("/getallcars",async(req,res)=>{
    try {
        const cars=await Car.find()
        res.send(cars)
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.post("/getcarbyid",async(req,res)=>{
    const carid=req.body.carid; 
    try {
        const car=await Car.findOne({_id:carid})
        res.send(car)
    } catch (error) {
        return res.status(400).json({error})
    }

})

module.exports=router;