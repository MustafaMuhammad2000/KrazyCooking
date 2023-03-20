import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const options = {
    headers: {

    }
};

export const fetchFromAPI = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
}