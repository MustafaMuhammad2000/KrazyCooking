import {createContext, useContext, useState, useEffect} from 'react';
import { validateToken } from './fetchFromApi';

const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // Load token from local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Perform a check with the server to verify the token is valid
      const data=validateToken(token);
        data.then((response) => {
          setUser(token);
          const parts = token.split('.');
          const payload = JSON.parse(decodeURIComponent(window.atob(parts[1])));
          setId(payload['id']);
          setAdmin(payload['admin']);
          console.log('Hey this is the token data:', token);
          console.log('Hey this is the token id:', payload['id']);
          console.log('Hey this is the token admin:', payload['admin']);
        })
        .catch((error) => {
          console.error(error);
          localStorage.removeItem('token');
          setUser(null);
          setId(null);
          setAdmin(false);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, id, setId, admin, setAdmin}}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}