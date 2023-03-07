import axios from 'axios';

const BASE_URL = 'https://586cea07-8a26-4c84-aa84-6a8f57684690.mock.pstmn.io/localhost:3000';

const options = {
    headers: {

    }
};

export const fetchFromAPI = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    console.log(data);
    return data;
}