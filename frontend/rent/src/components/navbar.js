import './navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    function logout() {
        localStorage.removeItem('currentUser')
        window.location.href = '/login'
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href='/'>
                    Fast & Easy
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">
                                Naslovna</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">O nama</a>
                        </li>

                        {user ? (<>
                            <div class="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {user.data.firstName}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="/profile">Profile</a>
                                    <a className="dropdown-item" onClick={logout}>Log Out</a>
                                </div>
                            </div>
                        </>) : (
                            <>
                                <li className="nav-item">
                                    <a className='login' href="/login">Login</a>
                                </li>

                                <li className="nav-item">
                                    <a className='registration' href="/register">Registration</a>
                                </li>
                            </>
                        )}
                    </ul>

                </div>
            </nav>
        </div>
    )
}

export default NavBar;