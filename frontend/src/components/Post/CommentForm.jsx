import React, { useState } from "react";
import { postComment } from "../../utils/fetchFromApi";
import styled from "@emotion/styled";
import { useUser } from "../../utils/UserContext";

const post = {
  postId: "64190e2b00157c19240f50cd",
  commentBody: "this is a comment",
};

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

const CommentForm = ({ postId }) => {
  const { user, id } = useUser();
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user id: ", id);
    if (comment.trim() === "") return;
    if (user === null) {
      console.error("USER ISNT LOGGED IN!");
      window.alert("you must be logged in to suggest a recipe");
      return;
    }

    if (comment.length < 5 || comment.length > 1000) {
      window.alert(
        `your recipe was ${comment.length} characters, it must be within 5 and 1000 characters`
      );
      return;
    }

    let data = new FormData();
    if (image !== "") data.append("image", image);
    data.append("body", comment);

    const res = postComment(data, postId, user);
    console.log("recipe response: ", res);

    setComment("");
  };

  //Element for writing recipes, includes a text box and adding an image
  return (
    <Container>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Adding Recipe */}
        <CommentInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your recipe here..."
        />

        {/* Submitting Image */}
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={(event) => {
            console.log("recipe image: ", event.target.files[0]);
            setImage(event.target.files[0]);
          }}
        ></input>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </Container>
  );
};

export default CommentForm;
