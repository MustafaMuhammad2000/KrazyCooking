import axios from "axios";
import { useUser } from "./UserContext";

const BASE_URL = "http://localhost:8000";

export const deleteReply = async (url, user) => {
  axios
    .delete(`${BASE_URL}/api/${url}`, {
      headers: {
        authorization: `${user}`,
      },
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postComment = async (body, postId, user) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: `${user}`,
    },
  };

  console.log("post comment body: ", body);
  console.log("post id: ", postId);
  console.log("token: ", user);
  try {
    const response = await axios.post(
      `${BASE_URL}/api/recipe/${postId}`,
      body,
      options
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
  return;
};

export const postReview = async (body, commentId, user) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: `${user}`,
    },
  };

  console.log("post review body: ", body);
  console.log("recipe id: ", commentId);
  console.log("token: ", user);
  try {
    const response = await axios.post(
      `${BASE_URL}/api/review/${commentId}`,
      body,
      options
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
  return;
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`);
  return data;
};
