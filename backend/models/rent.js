const mongoose=require("mongoose")

const rentingShema=mongoose.Schema({
    car:{
        type:String,
        require:true
    },
    carid:{
        type:String,
        require:true
    },
    userid:{
        type:String,
        require:true
    },
    fromDate:{
        type:String,
        require:true
    },
    toDate:{
        type:String,
        require:true
    },
    totalAmount:{
        type:Number,
        require:true
    },
    totalDays:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        require:true,
        default:'rented'
    },
},{
    timestamps:true
})

const rentingmodel=mongoose.model('rentings',rentingShema)

module.exports=rentingmodel;