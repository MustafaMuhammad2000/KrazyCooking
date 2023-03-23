import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const upvotePost = async (postId, user) => {
  axios
    .put(`${BASE_URL}/api/post/${postId}/upvote`, {
      headers: {
        authorization: `${user}`,
      },
    })
    .then((response) => {
      window.alert(response.data.message);
    })
    .catch((error) => {
      console.error(error);
      if (error.response) window.alert(error.response.data.message);
    });
};

export const deleteReply = async (url, user) => {
  axios
    .delete(`${BASE_URL}/api/${url}`, {
      headers: {
        authorization: `${user}`,
      },
    })
    .catch((error) => {
      console.error(error);
      if (error.response) window.alert(error.response.data.message);
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
