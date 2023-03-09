import { Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles'

import { logo } from '../utils/constants';
import SearchBar from './SearchBar';


const LoginButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 20, 
    padding: '6px 18px',
    border: '2px solid',
    borderRadius: 30,
    lineHeight: 1.5,
    backgroundColor: '#3DCBA7',
    borderColor: '#3DCBA7',
    '&:hover': {
        backgroundColor: '#45E4BC',
        borderColor: '#3DCBA7',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#2E987D',
        borderColor: '#3DCBA7',
    },
});

const Navbar = () => (
    <Stack 
        direction = "row" 
        alignItems={"center"}
        p={2} 
        sx={{position: 'sticky', background: '#4DFED1', top: 0, justifyContent: 'space-between', pr: 10, pl: 10}}
    >
        <Link to="/" style = {{display: 'flex', alignItems: 'center'}}>
            <img src={logo} alt="logo" height={45} />
        </Link>

        <Stack direction = "row">
            <SearchBar />

            <LoginButton variant="contained">
                Login
            </LoginButton>
        </Stack>
        

    </Stack>
)


export default Navbar