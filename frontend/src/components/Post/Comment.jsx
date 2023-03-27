import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Avatar,
  CardMedia,
  Rating,
} from "@mui/material";
import moment from "moment";
import { deleteReply } from "../../utils/fetchFromApi";
import { useUser } from "../../utils/UserContext";
import Popup from "./Popup";
import ReviewForm from "./ReviewForm";

const Comment = ({ comment }) => {
  const { user, id, admin } = useUser();
  const [commentId, setCommentId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //popup for reply button
  const togglePopup = (id) => {
    setCommentId(id);
    setIsOpen(!isOpen);
  };

  //takes an array of reviews and returns the average rating
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);

    return sum / reviews.length;
  };

  return (
    // Use MUIs card element
    <Card
      alignItems="center"
      sx={{
        justifyContent: "space-between",
        backgroundColor: "#A5D2FF",
        borderRadius: 10,
        border: "none",
        p: 3,
        display: "flex",
      }}
    >
      <Box sx={{ display: "flex", flexDirecction: "column" }}>
        <Box>
          {/* Contains profile picture, time since recipe, and username */}
          <CardHeader
            avatar={
              <Avatar>
                <img src={comment.author.profilePicture} height={30} />
              </Avatar>
            }
            title={comment.author.username}
            subheader={moment(new Date(comment.dateCreated)).fromNow()}
          />

          {/* Recipe Body */}
          <CardContent>
            <Typography paragraph>{comment.body}</Typography>
          </CardContent>

          {/* Reply Button */}
          <CardActions>
            <Button size="small" onClick={() => togglePopup(comment._id)}>
              Reply
            </Button>

            {/* Toggle reply popup when reply button is clicked */}
            {isOpen && (
              <Popup
                content={<ReviewForm recipeId={commentId} />}
                handleClose={togglePopup}
              />
            )}

            {/* Only show delete button for recipe author or an admin */}
            {(comment.author._id === id || admin) && (
              <Button
                size="small"
                onClick={() => {
                  deleteReply(`recipe/${comment._id}`, user);
                  //  refresh page
                  window.location.href = window.location.href;
                }}
              >
                Delete
              </Button>
            )}

            {/* Display Recipe Rating */}
            <Rating
              name="read-only"
              value={calculateAverageRating(comment.reviews) || 0}
              precision={0.5}
              readOnly
            />
          </CardActions>
        </Box>
      </Box>

      {/* Display recipe picture if there is any */}
      {comment.picture && (
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={comment.picture}
        />
      )}
    </Card>
  );
};

export default Comment;
