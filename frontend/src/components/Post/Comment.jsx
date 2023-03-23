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
  const togglePopup = (id) => {
    setCommentId(id);
    setIsOpen(!isOpen);
  };
  return (
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
          <CardHeader
            avatar={
              <Avatar>
                <img src={comment.author.profilePicture} height={30} />
              </Avatar>
            }
            title={comment.author.username}
            subheader={moment(new Date(comment.dateCreated)).fromNow()}
          ></CardHeader>
          <CardContent>
            <Typography paragraph>{comment.body}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => togglePopup(comment._id)}>
              Reply
            </Button>

            {isOpen && (
              <Popup
                content={<ReviewForm recipeId={commentId} />}
                handleClose={togglePopup}
              />
            )}

            {(comment.author._id === id || admin) && (
              <Button
                size="small"
                onClick={() => {
                  deleteReply(`recipe/${comment._id}`, user);
                }}
              >
                Delete
              </Button>
            )}
          </CardActions>
        </Box>
      </Box>
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
