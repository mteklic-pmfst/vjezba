import { Link, useNavigate  } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import './biranje.css'
// import axios from "axios";
import Car from "../components/Car"
import CarListing from "../components/listcar"
import Loader from '../components/loader';
import Error from '../components/error';
import "react-datepicker/dist/react-datepicker.css";
import 'antd/dist/reset.css';


function Choosing() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleReturnLocationChange = (event) => {
    setReturnLocation(event.target.value);
  };

  const handlePickupDateChange = (event) => {
    setPickupDate(event.target.value);
  };

  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicate, setDuplicate] = useState([]);

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const queryParams = new URLSearchParams({
      selectedLocation,
      returnLocation,
      pickupDate,
      returnDate,
    }).toString();
    navigate(`/car-list?${queryParams}`);
  };

  return (
    <div>
      <h1>Rent-a-Car Fast and Easy</h1>
      <form onSubmit={handleSearch}>
        <label htmlFor="pickup-location" id='pickup'>
          Mjesto preuzimanja:
          <select id="pickup-location" value={selectedLocation} onChange={handleLocationChange}>
            <option value="">Odaberi mjesto</option>
            <option value="Mall of Split">Mall of Split, Split</option>
            <option value="Joker">Trgovački centar Joker, Split</option>
            <option value="City Center One">City Center one, Split</option>
          </select>
        </label>

        <label htmlFor="return-location">
          Mjesto vraćanja:
          <select id="return-location" value={returnLocation} onChange={handleReturnLocationChange}>
            <option value="">Odaberi mjesto</option>
            <option value="Mall of Split">Mall of Split, Split</option>
            <option value="Joker">Trgovački centar Joker, Split</option>
            <option value="City Center One">City Center one, Split</option>
          </select>
        </label>

        <label htmlFor="pickup-date">
          Datum polaska:
          <input type="date" id="pickup-date" value={pickupDate} onChange={handlePickupDateChange} />
        </label>

        <label htmlFor="return-date">
          Datum povratka:
          <input type="date" id="return-date" value={returnDate} onChange={handleReturnDateChange} />
        </label>

        
        <button type="submit">Pretraži</button>
        
      </form>

    </div>
  )
  }
export default Choosing;