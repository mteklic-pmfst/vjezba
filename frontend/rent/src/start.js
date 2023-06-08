import React from 'react'
import { Link } from "react-router-dom";
import './start.css';

function Start() {
    return (
        <div className='content'>
            <div className='intro'>
                <p>Searching for the perfect car? 
                    In our rent-a-car application, fast and easy find a vehicle that suits your needs and desires the best.
                </p>
                <Link to='/login'>
                    <button className='button'>Let's find your car!</button>
                </Link>
            </div>
        </div>
    )
}

export default Start;