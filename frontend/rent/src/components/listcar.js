import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd';
import moment from "moment";
import axios from "axios";
import Car from "../components/Car"
import Loader from '../components/loader';
import Error from '../components/error';
import "react-datepicker/dist/react-datepicker.css";
import 'antd/dist/reset.css';
import { useLocation } from 'react-router-dom';

function CarListing() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [duplicate, setDuplicate] = useState([]);
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedLocation = queryParams.get('selectedLocation');
  const returnLocation = queryParams.get('returnLocation');
  const pickupDate = queryParams.get('pickupDate');
  const returnDate = queryParams.get('returnDate');

    const getCar = async () => {

        setLoading(true)
        const res = await axios.get('http://localhost:3001/api/cars/getallcars')
        setData(res.data);
        setDuplicate(res.data)
        console.log(res.data)
        setLoading(false);
      }

      useEffect(() => {
        try {
          getCar();
        } catch (error) {
          setError(true)
          console.log(error)
          setLoading(false)
        }

      }, [])

    return(
<div>
        { loading ? (<Loader />)
          : data.length > 1 ? (data.map((car) => {
          return <div className='displayone'>
            <Car car={car} fromDate={pickupDate} toDate={returnDate} pickUp={selectedLocation} returnCar={returnLocation} />
          </div>
        })):(
            <Error />
          )

}
        </div>
    )

}

export default CarListing;