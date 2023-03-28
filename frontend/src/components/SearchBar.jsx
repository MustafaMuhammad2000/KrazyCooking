import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';


const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    //sends user to search route with search query
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/search/' + searchText);
    }

    //update search bar with user input
    const handleChange = (e) => {
        setSearchText(e.target.value);
    }

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
                borderRadius: 20,
                border: '1px solid #e3e3e3',
                pl: 2,
                boxShadow: 'none',
                mr: { sm: 5 }
            }}
        >
            <input
                className="search-bar"
                placeholder="Search..."
                value={searchText}
                onChange={handleChange}
            />
            <IconButton
                type="submit"
                sx={{
                    p: '10px',
                    color: 'black'
                }}
            >
                <Search />
            </IconButton>
        </Paper>
    )
}

export default SearchBar