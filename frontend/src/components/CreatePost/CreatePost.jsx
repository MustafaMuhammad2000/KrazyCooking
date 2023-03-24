import React from "react";
import { useState } from "react";
import { useUser } from "../../utils/UserContext";
import { Box, Stack, styled, Button } from "@mui/material";
import { createPost } from "../../utils/fetchFromApi";

const IdeaInput = styled("textarea")`
  width: 40vw;
  height: 150px;
  padding: 10px;
  border: 1px solid #b7b9f7;
  border-radius: 4px;
  resize: none;
`;

const TitleInput = styled("textarea")`
  width: 40vw;
  height: 20px;
  padding: 10px;
  border: 1px solid #b7b9f7;
  border-radius: 4px;
  resize: none;
`;

const buttonStyle = {
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  color: "#6b6c7f",
  padding: "6px 18px",
  border: "2px solid",
  borderRadius: 30,
  lineHeight: 1.5,
  marginLeft: 40,
  backgroundColor: "#D7D8FF",
  borderColor: "#D7D8FF",
  "&:hover": {
    backgroundColor: "#b7b9f7",
    borderColor: "#b7b9f7",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#b7b9f7",
    borderColor: "#b7b9f7",
  },
};

const tags = ["Pasta", "Spaghetti", "Beef"];

const CreatePost = () => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  //   title: Joi.string().min(3).max(100).required(),
  //   body: Joi.string().min(5).max(1000).required(),
  //   tags: Joi.array().items(Joi.string().max(20)).required(),

  const handleSubmit = (e) => {
    e.preventDefault();

    if (body.trim() === "") return;
    if (title.trim() === "") return;
    if (user === null) {
      console.error("USER ISNT LOGGED IN!");
      window.alert("you must be logged in to create a post");
      return;
    }

    if (title.length < 3 || title.length > 100) {
      window.alert(
        `your title was ${title.length} characters, it must be within 3 and 100 characters`
      );
      return;
    }

    if (body.length < 5 || body.length > 1000) {
      window.alert(
        `your idea was ${body.length} characters, it must be within 5 and 1000 characters`
      );
      return;
    }

    let data = new FormData();
    data.append("title", title);
    data.append("body", body);
    data.append("tags", tags);
    if (image !== "") data.append("image", image);

    const res = createPost(data, user);
    console.log("postResponse: ", res);

    setTitle("");
    setBody("");
    // window.location.href = window.location.href;
  };

  return (
    <div>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Stack
          direction="column"
          alignItems="center"
          gap={0}
          pb={2}
          mb={40}
          sx={{
            backgroundColor: "#A5D2FF",
            borderRadius: 10,
            border: "none",
          }}
        >
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Title Input */}
            <Box pt={4} pr={4} pl={4} pb={2}>
              <TitleInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write your title here..."
              />
            </Box>

            {/* Post Body Input */}
            <Box pb={4} pr={4} pl={4}>
              <IdeaInput
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your idea here..."
              />
            </Box>
            <Box>
              {/* Submitting Image */}
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={(event) => {
                  console.log("recipe image: ", event.target.files[0]);
                  setImage(event.target.files[0]);
                }}
              ></input>
              <Button type="submit" style={buttonStyle}>
                Submit
              </Button>
            </Box>
          </form>
        </Stack>
      </Box>
    </div>
  );
};

export default CreatePost;