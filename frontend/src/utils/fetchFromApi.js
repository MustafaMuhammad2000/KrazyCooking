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

  try {
    const response = await axios.post(
      `${BASE_URL}/api/recipe/${postId}`,
      body,
      options
    );
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

  axios
    .post(`${BASE_URL}/api/review/${commentId}`, body, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        if (
          error.response.data.message ===
          "User has already written a review for this recipe"
        ) {
          window.alert("You have already reviewed this recipe!");
        }
      }
    });
  return;
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`);
  return data;
};
