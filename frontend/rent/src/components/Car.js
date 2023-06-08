import React, { useState } from 'react';
import './car.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@iconify/react';
import { BsPeople } from "react-icons/bs";
import { LuLuggage } from "react-icons/lu";
import { TbManualGearbox } from "react-icons/tb";

function Car({ car, fromDate, toDate, pickUp, returnCar }) {

    return (
        <div className='dizajn'>
            <div className='column'>
                <h1>{car.name}</h1>
                <p>Price: {car.price} €</p>
                <div className='pojedinosti'>
                    <div><FontAwesomeIcon icon={faGasPump} /> {car.features.gorivo}</div>
                    <div><Icon icon="mdi:car-door" /> {car.features.brojvrata}</div>
                    <div><BsPeople /> {car.features.maxbrputnika}</div>
                    <div><LuLuggage /> {car.features.kapacitet}</div>
                    <div><TbManualGearbox /> {car.features.mjenjac}</div>
                    <div className='buttoncl'>
                        {(fromDate && toDate) && (
                            <Link to={`/rent/${car._id}/${fromDate}/${toDate}/${pickUp}/${returnCar}`}>
                                <button className='btn0'>Rent</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className='column'>
                <img src={car.image} className='small' />
            </div>
        </div>
    )
}

export default Car;