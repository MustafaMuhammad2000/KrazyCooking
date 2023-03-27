import React, {useState, useEffect } from 'react';
import { useUser } from '../../utils/UserContext';
import { Box, Stack, Typography } from '@mui/material';
import {
  LoginAPI,
  validateToken
} from "../../utils/fetchFromApi";

function Login() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();


  // button and container styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#FFFFFF'
  };
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '55px',
    backgroundColor: '#B4DAFF',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  };

  const labelStyle = {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 400,
    textAlign: 'left',
fontFamily: 'Roboto',
fontStyle: 'normal'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#DBDCF9',
    color: '#000000',
    border: 'none',
    //borderRadius: '3px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: 20,
            border: '1px solid #e3e3e3',
            pl: 2,
            boxShadow: 'none',
            mr: { sm: 5 } 
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '16px',
    backgroundColor: '#FFFFFF'
    //boxShadow: '#DBDCF9'
  };

   /// checks the token from local storage and verifies it
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Perform a check with the server to verify the token is valid
        const data= validateToken(token);
        console.log("Hey this is the data:", data);
          data.then((response) => {
            const { username } = response.data;
            setUser(response.data);
            console.log("Hey this is the data:", response.data);
            console.log("Hey this is the token user:", response.data.username);
            console.log("Hey this is the token id:", response.data.id);
          })
          .catch((error) => {
            console.error(error);
            console.log("Hey this is the token error", token);
            localStorage.removeItem("token");
            setUser(null); // Remove the user from the user context if the token is invalid
          });
      }
    };

    checkToken(); // Call the function when the component mounts

    // Call the function whenever the user context is updated
    return () => {
      checkToken();
    };
  }, [setUser]);

  //handles the user entering username
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  //handles the user entering password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  /// handles the login function, when submit is pressed
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data= await LoginAPI(Username,password);
      const { token } = data;
      localStorage.setItem("token", token);
      setUser(Username);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
     

  };

  return (

    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label  style={labelStyle}>
          Username:
          <input type="Username" value={Username} onChange={handleUsernameChange} 
          style = {inputStyle}/>
        </label>
        <br />
        <label  style={labelStyle}>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} 
          style = {inputStyle}/>
        </label>
        <br />
        <button type="submit" style = {buttonStyle}>Login</button>
      </form>
    </div>
  );
}

export default Login;
