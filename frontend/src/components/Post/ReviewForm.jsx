import React, { useState } from "react";
import { postReview } from "../../utils/fetchFromApi";
import styled from "@emotion/styled";
import { useUser } from "../../utils/UserContext";
import Rating from "@mui/material/Rating";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: #007bff;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ReviewForm = ({ recipeId }) => {
  const { user, setUser } = useUser();
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [value, setValue] = React.useState(2);

  console.log("comment id: ", recipeId);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    if (user === null) {
      console.error("USER ISNT LOGGED IN!");
      window.alert(
        "you must be logged in to leave a review! 💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀"
      );
      return;
    }

    if (image === "") {
      window.alert("you must add an image to your review");
      return;
    }

    if (comment.length < 5 || comment.length > 1000) {
      window.alert(
        `your comment was ${comment.length} characters, it must be within 5 and 1000 characters`
      );
      return;
    }

    let data = new FormData();
    data.append("image", image);
    data.append("body", comment);
    data.append("rating", value);

    const res = postReview(data, recipeId, user);
    console.log(res);

    setComment("");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <CommentInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
        />

        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setImage(event.target.files[0]);
          }}
        ></input>

        <Rating
          name="simple-controlled"
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </Container>
  );
};

export default ReviewForm;
