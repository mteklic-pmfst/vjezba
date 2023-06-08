import React, { useState, useEffect } from 'react';
import "./login.css";
import axios from 'axios';
import Loader from './loader.js';
import Error from './error.js';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function login() {
    if (password !== "") {

      const user = {
        email,
        password,
      }

      console.log(user)

      try {
        setLoading(true)
        const result = await axios.post('http://localhost:3001/api/auth/login', user)
        setLoading(false)
        localStorage.setItem('currentUser', JSON.stringify(result))
        window.location.href = '/home'
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
      }
    }
    else if (email === "" && password === "") {
      alert("UNESITE PODATKE!")
    }
    else if (email === "") {
      alert("UNESITE EMAIL!")
    }
    else if (password === "") {
      alert("UNESITE LOZINKU!")
    }

  }

  return (
    <div className='login1'>
      {loading && (<Loader />)}

      <div className='pocetna '>
        <div className='form'>
          <div className='form-log'>
            {error && (<Error message='Invalid Credentionals' />)}
            <div className='log1'>
              <h2>Login</h2>
              Email:
              <input type="text" className='form-control' placeholder='email'
                id="username" value={email} onChange={(e) => (setEmail(e.target.value))}
              />
              Password:
              <input type="password" className='form-control' placeholder='lozinka'
                id="pass" value={password} onChange={(e) => (setPassword(e.target.value))}
              />
              <button className='btnS' onClick={login}>Login</button>

              <div className="signin">
                Don't have an account?
                <Link to='/register'>
                  <button> Sign up </button>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginForm;

