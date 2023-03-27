import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostBody from "./PostBody";
import { Stack, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchFromAPI } from "../../utils/fetchFromApi";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //Go back to previous page
  const goBack = () => {
    navigate(-1);
  };
  const [post, setPost] = useState([]);

  //when page is loaded fetch post from api
  useEffect(() => {
    fetchFromAPI("api/post/" + id + "/view").then((data) => setPost(data));
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      gap={2}
      alignContent="center"
    >
      {/* Arrow back button */}
      <IconButton
        sx={{
          borderRadius: 25,
          backgroundColor: "#D7D8FF",
          height: 45,
          widgth: 45,
          mt: 10,
        }}
        onClick={goBack}
      >
        <ArrowBackIcon />
      </IconButton>
      {/* Contains all the info from original post */}
      <PostBody post={post} />
    </Stack>
  );
};

export default Post;
