import { useState } from 'react';
import {Typography, Stack } from '@mui/material';
import React, { Component }  from 'react';



export default function Form() {

// States for registration
const [username, setName] = useState('');
//const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const[admin, setAdmin] = useState(false);

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);
const axios = require('axios');

const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
 
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

const handleSubmit = async(e) => {
	e.preventDefault();
  
	if (username === '' || password === '') {
	setError(true);
	} else {
	setSubmitted(true);
	setError(false);
  try{
    const response = await axios.post('http://localhost:8000/api/user/register',{
      username: username,
      password: password,
    });
    window.location.href ='/login';
  } catch (error){
    console.error(error);
    alert('Register failed. Please try again.');
  } 
	}
};

const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
		<h1>User {username} Registration was successful!</h1>
	</div>
	);
};

const errorMessage = () => {
	return (
	<div
		className="error"
		style={{
		display: error ? '' : 'none',
		}}>
		<h1>Please enter all the fields</h1>
	</div>
	);
};

return (
	<div className="form">
        
	<div>
    <Typography variant = "body1" color="black">

		<h1>User Registration</h1>
        </Typography>
	</div>

	<form>
    <Typography variant = "body1" color="black">

		{/* Labels and inputs for form data */}
		<p><label className="label">username</label></p>
		<input onChange={handleName} className="input"
          value={username} type="text" />

		<p><label className="label">password</label></p>
		<input onChange={handlePassword} className="input"
          value={password} type="password" />
        <p>
		<button onClick={handleSubmit} className="btn" type="submit">
		Submit
		</button>
        </p>
        </Typography>
	</form>

    	{/* Calling to the methods */}
	<div className="messages">
    <Typography variant = "body1" color="black">

		{errorMessage()}
		{successMessage()}
        </Typography>
	</div>
	</div>
);
}
