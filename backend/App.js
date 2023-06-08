const express =require("express");
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv');
require('express-async-errors')

const authRoute=require('./routes/auth')
const carsRoute = require('./routes/carRoutes.js')
const usersRoute = require('./routes/userRoutes.js')
const rentRoute = require('./routes/rentRoutes.js')
const app = express();
dotenv.config();

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result => {
  console.log("Spojeni smo na bazu");
}).catch(error => {
  console.log("Greška pri spajanju", error.message);
})

app.use(cors());
app.use(express.json())
app.use('/api/cars',carsRoute)
app.use('/api/users',usersRoute)
app.use('/api/auth',authRoute)
app.use('/api/renting',rentRoute)

module.exports = app;