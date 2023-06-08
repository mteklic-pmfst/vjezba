const express = require("express")
const router = express.Router();
const Rent = require("../models/rent")
const Car = require("../models/car")
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51N3vFzBFWkHUqSlGcPeH1lv1BhiW5EvWAC3sQkLYFGMc2XdYv1m4plDzKU426T4X8gV7UcyNXT7qH1ITccchCeil00o3BTiKh6')

router.post('/rentcar', async (req, res) => {
    const {
        car,
        userid,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        token
    } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        })
        const payment = await stripe.charges.create({

            amount: totalAmount * 100,
            customer: customer.id,
            currency: 'eur',
            receipt_email: token.email
        },
            {
                idempotencyKey: uuidv4()
            }
        )

        if (payment) {
            try {
                const newRenting = new Rent({
                    car: car.name,
                    carid: car._id,
                    userid,
                    fromDate,
                    toDate,
                    totalAmount,
                    totalDays,
                    transactionid: '1234'

                })

                const renting = await newRenting.save()
                const temp = await Car.findOne({ _id: car._id })

                temp.currentrenting.push({
                    rentingid: renting._id,
                    fromDate: fromDate,
                    toDate: toDate,
                    userid: userid,
                    status: renting.status
                });

                await temp.save()

            }
            catch (err) {
                console.error(err);
                return res.status(400).json({ message: "Error: " + err.message })
            }
        }
        res.send('Payment Succesful,You booked room')

    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error: " + err.message })
    }

})

router.post("/getuserrenting", async (req, res) => {
    const userid = req.body.userid

    try {
        const rentings = await Rent.find({ userid: userid })
        res.send(rentings)
    } catch (err) {
        console.error(err);
        return res.status(404).json({ message: "Error: " + err.message })
    }
})


router.post("/cancelrenting", async (req, res) => {
    const { rentingid, carid } = req.body

    try {
        const rentingItem = await Rent.findOne({ _id: rentingid })

        rentingItem.status = 'cancelled'

        await rentingItem.save()
        const car = await Car.findOne({ _id: carid })

        const rentings = car.currentrenting

        const temp = rentings.filter(renting => renting.rentingid.toString() !== rentingid)

        car.currentrenting = temp

        res.send('Reservation successfully cancelled!')

        await car.save()
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error: " + err.message })
    }
})


module.exports = router;