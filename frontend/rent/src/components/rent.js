import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Loader from './loader.js';
import Error from './error.js';
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'


function Renting() {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const { carid, fromDate, toDate, pickUp, returnCar } = useParams();
  const [car, setCar] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const postData = async () => {
    setLoading(true)
    const res = await axios.post('http://localhost:3001/api/cars/getcarbyid', { carid: carid })
    setCar(res.data);
    setTotalamount(res.data.price * totaldays)
    setLoading(false);
  }

  useEffect(() => {
    try {
      postData();
    } catch (error) {
      setError(true)
      console.log(error)
      setLoading(false)
    }
  }, [])

  const firstdate = moment(fromDate)
  const lastdate = moment(toDate)
  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1
  const [totalAmount, setTotalamount] = useState();

  async function onToken(token) {
    const rentingDetails = {
      car,
      userid: JSON.parse(localStorage.getItem('currentUser')).data._id,
      fromDate,
      toDate,
      totalAmount,
      pickUp,
      returnCar,
      totaldays,
      token
    }
    try {
      setLoading(true)
      const result = axios.post('http://localhost:3001/api/renting/rentcar', rentingDetails)
      setLoading(false)
      Swal.fire('Congratulations', 'You rented a car', 'success')
        .then(result => {
          window.location.href = '/home'
        })
      console.log(result)
    } catch (error) {
      setLoading(false)
      Swal.fire('UPS!', 'Something went wrong', 'error')
    }
  }

  return (
    <div className='m-5'>
      {loading ? (<Loader />) : car ? (
        <div>
          <div className='row mt-5 '>
            <div className='col-md-5' id="1">
              <h1>{car.name}</h1>
              <img src={car.image} className='' style={{ maxWidth: '100%' }} />
            </div>
            <div className='col-md-7 mt-5' id="2">
              <div style={{ textAlign: 'center' }}>
                <h4>Renting Details</h4>
                <hr />

                <p><b>Name:</b>  {user.data.firstName}</p>
                <p><b>From Date:</b> {fromDate}</p>
                <p><b>To Date:</b> {toDate}</p>
                <p><b>Pick Up:</b> {pickUp}</p>
                <p><b>Return Location:</b> {returnCar}</p>

              </div>

              <div style={{ textAlign: 'right' }}>
                <h4>Amount</h4>
                <hr />
                <p><b>Total days:</b>  {totaldays}</p>
                <p><b>Rent per day:</b>  {car.price} €</p>
                <b>Total Amount: {totalAmount} €</b>
              </div>

              <div style={{ float: 'right' }}>
                <br></br>
                <StripeCheckout
                  token={onToken}
                  stripeKey="pk_test_51N3vFzBFWkHUqSlGJ0IroYTABBpaEKgwolqfc5iM7QvVRHeoQgIiXpelyWBcg8cPctQf2mtwJNBvjxr7GB0Do07Y00lSZYZIpE"
                >
                  <button className='btn btn-primary' >Pay Now </button>
                </StripeCheckout>
              </div>
            </div>
          </div>

        </div>
      ) : (<Error />)}
    </div>
  )
}

export default Renting;