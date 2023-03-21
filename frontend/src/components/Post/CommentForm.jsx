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
  const { user, setUser } = useUser();
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    let data = new FormData();
    data.append("image", image);
    data.append("body", comment);

    const res = postComment(data, postId, user);
    console.log(res);

    setComment("");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <CommentInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
        />
        {/* <input type="file" accept="image/jpeg, image/png, image/jpg"
                onChange={(e) => setImage(e.target.files)}>

            </input> */}
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setImage(event.target.files[0]);
          }}
        ></input>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </Container>
  );
};

export default CommentForm;
