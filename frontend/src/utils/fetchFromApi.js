import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const options = {
    headers: {
        "Content-Type": 'application/json',
        "authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphY2sxMjMiLCJpZCI6IjY0MTkwMWNhMDAxNTdjMTkyNDBmNTA2YSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjc5NDIzNTczLCJleHAiOjE2Nzk0NTk1NzN9.EWdvc5wILFJVVAg43_p1Zn2LvW9HP7y3l3anq0sQwn0'
    }
};

export const postComment = async (body, postId) => {

    
    console.log("post comment body: ", body);
    console.log("post id: ", postId);
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