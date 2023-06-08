import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Tabs } from 'antd';
import './profile.css'
// import Loader from './loader.js';
import Swal from 'sweetalert2'
import { Tag } from 'antd';


const { TabPane } = Tabs
function Profile() {
 
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const birthdate = new Date(user.data.birthdate);
    const birthdateString = birthdate.toLocaleDateString();

    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [])
    return (
        <div className='mt-3 ms-3' >
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <div className='ls'>
                        <h3><b>MY PROFILE</b></h3>
                        <hr />
                        <h4><b>Name:</b> {user.data.firstName}</h4>
                        <h4><b>Surname:</b> {user.data.lastName}</h4>
                        <h4><b>Date of birth:</b> {birthdateString}</h4>
                        <h4><b>Email:</b> {user.data.email}</h4>
                        
                    </div>

                </TabPane>
                <TabPane tab="Rented cars" key="2">
                    <MyRent />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profile;

export function MyRent() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const [renting, setRenting] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const fetchRent = async () => {
        setLoading(true)
        const cars = await axios.post('http://localhost:3001/api/renting/getuserrenting', { userid: user.data._id })
        console.log(cars)
        setRenting(cars.data)
        setLoading(false)
    }

    async function cancelRent(rentingid, carid) {
        try {
            setLoading(true)
            const result = await axios.post('http://localhost:3001/api/renting/cancelrenting', { rentingid, carid })
            console.log(result)
            setLoading(false)
            Swal.fire('Well done', 'You cancel car', 'success')
                .then(result => {
                    window.location.reload()
                })
        } catch (err) {
            setLoading(false)
            console.error(err);
            Swal.fire('UPS! :(', 'Something went wrong', 'error')
        }
    }

    useEffect(() => {
        try {
            fetchRent()
            console.log(fetchRent())
        } catch (err) {
            console.error(err);
            setLoading(false)
            setError(true)
        }
    }, [])

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {/* {loading && (<Loader />)} */}
                    {renting && (renting.map(renting => {
                        return (
                            <div className='ls'>
                                <p><b>{renting.car}</b></p>
                                <p><b>Renting ID: {renting._id}</b></p>
                                <p><b>Check In: {renting.fromDate} </b></p>
                                <p><b>Check Out: {renting.toDate} </b></p>
                                <p><b>Amount: {renting.totalAmount} €</b></p>
                                <p><b>Status: </b>
                                {""}
                                    {renting.status == 'cancelled' ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)}
                                </p>
                                {renting.status !== 'cancelled' && (
                                    <p>
                                        <button style={{ float: 'right' }} onClick={() => { cancelRent(renting._id, renting.carid) }}>Cancel Rent</button>
                                    </p>
                                )}
                            </div>
                        )
                    }))}
                </div>
            </div>
        </div>
    )
}


