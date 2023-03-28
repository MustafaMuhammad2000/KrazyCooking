import axios from "axios";

const BASE_URL = "https://plucky-alliance-381901.uw.r.appspot.com";

//function to create a post , requires an auth token
export const createPost = async (body, user) => {
  axios
    .post(`${BASE_URL}/api/post`, body, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${user}`,
      },
    })
    .catch((error) => {
      console.log(error);
      if (error.response)
        console.log("create post error: ", error.response.data.message);
    });
};

//function to delete a post , requires an auth token
export const deletePost = async (post_id, user) => {
  axios
    .delete(`${BASE_URL}/api/post${post_id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${user}`,
      },
    })
    .catch((error) => {
      console.log(error);
      if (error.response)
        console.log("delete post error: ", error.response.data.message);
    });
};


//function to save a post, requires post id and auth token
export const savePost = async (postId, user) => {
  axios
    .post(
      `${BASE_URL}/api/user/savePost/${postId}`,
      {},
      {
        headers: {
          authorization: `${user}`,
        },
      }
    )
    .then((response) => {
      window.alert(response.data.message);
    })
    .catch((error) => {
      console.log(error);
      if (error.response) window.alert(error.response.data.message);
    });
};

//function to unsave a post, requires post id and auth token
export const unsavePost = async (postId, user) => {
  console.log("token: ", user);
  console.log("post id: ", postId);
  axios
    .delete(`${BASE_URL}/api/user/removeSavedPost/${postId}`, {
      headers: {
        authorization: `${user}`,
      },
    })
    .then((response) => {
      window.alert(response.data.message);
    })
    .catch((error) => {
      console.log(error);
      if (error.response) window.alert(error.response.data.message);
    });
};

//function to upvote a post, requires an auth token
export const upvotePost = async (postId, user) => {
  axios
    .put(
      `${BASE_URL}/api/post/${postId}/upvote`,
      {},
      {
        headers: {
          authorization: `${user}`,
        },
      }
    )
    .then((response) => {
      window.alert(response.data.message);
    })
    .catch((error) => {
      console.error(error);
      if (error.response) window.alert(error.response.data.message);
    });
};

//function to remove upvote from a post, requires auth token
export const removeUpvote = async (postId, user) => {
  axios
    .put(
      `${BASE_URL}/api/post/${postId}/remove-upvote`,
      {},
      {
        headers: {
          authorization: `${user}`,
        },
      }
    )
    .then((response) => {
      window.alert(response.data.message);
    })
    .catch((error) => {
      console.error(error);
      if (error.response) window.alert(error.response.data.message);
    });
};

//deletes a reply from the database, requires auth token
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

//Function to post a recipe to endpoint, needs auth token and post id
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

//Function to post a review to endpoint, needs auth token and comment id
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

//General function to make get requests to api
export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`);
  return data;
};

//Endpoint to get a saved post, needs user auth token
export const getSavedPosts = async (url, user) => {
  const { data } = await axios
    .get(`${BASE_URL}/${url}`, {
      headers: {
        authorization: `${user}`,
      },
    })
    .catch((error) => {
      if (error.response)
        console.log("get post error: ", error.response.data.message);
    });
  return data.savedPosts;
};

// Endpoint to get all posts from api
export const getMyPosts = async (url, user) => {
  const { data } = await axios
    .get(`${BASE_URL}/${url}`, {
      headers: {
        authorization: `${user}`,
      },
    })
    .catch((error) => {
      if (error.response)
        console.log("get post error: ", error.response.data.message);
    });
  return data.posts;
};


// Endpoint to login
export const LoginAPI = async (Username,Password) => {
  const response = await axios
    .post(`${BASE_URL}/api/user/login`, {
        username: Username,
        password: Password,
    })
    .catch((error) => {
      if (error.response)
      {
        console.error(error);
        alert("Login failed. Please try again.");
      }
    });
  return response.data;
};

// Endpoint to Register
export const RegisterAPI = async (Username,Password,DOB) => {
  const response = await axios
    .post(`${BASE_URL}/api/user/login`, {
        username: Username,
        password: Password,
        dateOfBirth: DOB,
    })
    .catch((error) => {
      if (error.response)
      {
        console.error(error);
        alert("Registration failed. Please try again.");
      }
    });
    console.log("response:", response.data);
  return response.data;
};


// Endpoint to validate user token
export const validateToken = async (token) => {
  const response = await axios
    .get(`${BASE_URL}/api/user/getUser`, {
      headers: {
        authorization: `${token}`,
      },
    })
    .catch((error) => {
      if (error.response)
      {
        console.error(error);
      }
    });
  return response.data;
};


// Endpoint to get user profile
export const getProfile = async (user) => {
  const response = await axios
    .get(`${BASE_URL}/api/user/Profile`, {
      headers: {
        authorization: `${user}`,
      },
    })
    .catch((error) => {
      if (error.response)
      {
        console.error(error);
      }
    });
  return response.data;
};

//Function to upload profilePic to endpoint, Picture, user required
export const postProfilePic= async (data, user) => {
  const options = {
    headers: {
      authorization: `${user}`,
      "Content-Type": "application/json",
    },
  };

    await axios.post(`${BASE_URL}/api/user/uploadProfilePic`, data, options)
    .then((response) => {
      console.log("respon:", response);
      
      return response;
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
              console.log("respon:", error.response);
        alert("Profile picture upload failed. Please try again.");
      }
    });
  return;
};

//Function to change password to endpoint, Picture, user, password, new password required
export const changePassword= async (CurrentPW,newPassword, user) => {
  const options = {
    headers: {
      authorization: `${user}`,
    },
  };

    await axios.patch(`${BASE_URL}/api/user/updatePassword`, 
      {
        currentPassword: CurrentPW,
        newPassword: newPassword,
      }, 
      options)
    .then((response) => {
      console.log("respon:", response);
      alert("Password changed successfully!");
      return response;
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
              console.log("respon:", error.response);
        alert("Password change failed. Please try again.");
      }
    });
  return;
};