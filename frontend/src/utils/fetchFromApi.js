import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const options = {
    headers: {
        "Content-Type": 'application/json',
        "authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphY2sxMjMiLCJpZCI6IjY0MTkwMWNhMDAxNTdjMTkyNDBmNTA2YSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjc5MzY2MTIzLCJleHAiOjE2Nzk0MDIxMjN9.8NCFjxsvhozyvReN8oo9XVR7bFyBkFxrsP7WDdoID3s'
    }
};

export const postComment = async (body, postId) => {

    
    console.log("post comment body: ", body);
    try {
        const response = await axios.post(`${BASE_URL}/api/recipe/${postId}`, body, options);
        console.log(response.data);
        return response;
    } catch (error) {
        console.error(error);
    }
    return;
}

export const fetchFromAPI = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`);
    return data;
}