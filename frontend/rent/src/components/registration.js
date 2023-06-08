import "./registration.css";
import React, { useState } from 'react';
import axios from 'axios';
import Loader from './loader.js';
import Error from './error.js';
import Success from './success.js';
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  async function register() {
    if (password === confirmPassword) {

      const user = {
        firstName,
        lastName,
        birthdate,
        email,
        password,
        confirmPassword
      }

      console.log(user)

      try {
        setLoading(true)
        const result = await axios.post('http://localhost:3001/api/auth/register', user)
        setLoading(false)
        setSuccess(true)

        setFirstName('')
        setLastName('')
        setBirthdate('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')

      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
      }
    }
    else {
      alert("PASSWORDS DON'T MATCH! TRY AGAIN!")
      setPassword('')
      setConfirmPassword('')
    }

  }

  return (
    <form className='registration-form'>
      {loading && (<Loader />)}
      {error && (<Error message='User exist' />)}
        
      <div>
        {success && (<Success message='Successfully registered' />)}

        <h2>Sign up</h2>

        <label htmlFor="first-name">First Name:</label>
        <input type="text" id="first-name" name="first-name" placeholder="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      
      <div>
        <label htmlFor="last-name">Last Name:</label>
        <input type="text" id="last-name" name="last-name" placeholder="last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="birthdate">Date of Birth:</label>
        <input type="date" id="birthdate" name="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>

      <button type="submit" onClick={register}>Register</button>

      <div className="signin">
        Already have an account?
        <Link to='/login'>
          <button> Sign in </button>
        </Link>
      </div>

      </div>
      
    </form>
  )
}

export default RegistrationForm;