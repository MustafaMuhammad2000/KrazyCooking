import React, { useState } from "react";
import { postComment } from "../../utils/fetchFromApi";
import styled from "@emotion/styled";
import { useUser } from "../../utils/UserContext";

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
  const { user } = useUser(); //user auth token
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");

  //Called when user submits recipe
  const handleSubmit = async (e) => {
    e.preventDefault();

    //checks if comment is empty
    if (comment.trim() === "") return;

    //Only logged in user can leave recipe
    if (user === null) {
      window.alert("you must be logged in to suggest a recipe");
      return;
    }

    //ensures recipe suggestion is correct length
    if (comment.length <= 5 || comment.length >= 4000) {
      window.alert(
        `your recipe was ${comment.length} characters, it must be over 5 and less than 4000 characters`
      );
      return;
    }

    //Create form data object, only add image if there is one
    let data = new FormData();
    if (image !== "") data.append("image", image);
    data.append("body", comment);

    //send form data to api, including post id and user auth token
    const res = await postComment(data, postId, user);

    setComment("");
    window.location.reload();
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
