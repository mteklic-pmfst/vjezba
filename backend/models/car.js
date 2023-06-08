const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: [],
    price: {
        type: Number,
        required: true
    },
    currentrenting: [],
    decription: {
        type: String,
    },
    features: {
        maxbrputnika: { type: Number, required: true },
        mjenjac: { type: String, required: true },
        brojvrata: { type: Number, required: true },
        gorivo: { type: String, required: true },
        kapacitet: { type: String, required: true }
    }

},

    {
        timestamps: true
    })

const carModel = mongoose.model('cars', carSchema);

module.exports = carModel;