import React, {useState, useEffect } from 'react';
import { useUser } from '../../utils/UserContext';

function Login() {
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const{setUser} = useUser();
  const{setUserId}= useUser();
  const axios = require('axios');

  console.log('Entered user:', Username);


  
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Perform a check with the server to verify the token is valid
        axios
          .get('http://localhost:8000/api/user/getUser', {
            headers: {
              authorization: `${token}`,
            },
          })
          .then((response) => {
            const { username } = response.data;
            setUser(response.data);
            console.log('Hey this is the data:', response.data);
            console.log('Hey this is the token user:', response.data.username);
            console.log('Hey this is the token id:', response.data.id);
          })
          .catch((error) => {
            console.error(error);
            console.log('Hey this is the token error', token);
            localStorage.removeItem('token');
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    //TODO: add login logic here
    try{
      const response = await axios.post('http://localhost:8000/api/user/login',{
        username: Username,
        password: password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log('this is the token:',response.data);
      setUser(Username);
      window.location.href ='/';
    } catch (error){
      console.error(error);
      alert('Login failed. Please try again.');
    } 
  };
  


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="Username" value={Username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
