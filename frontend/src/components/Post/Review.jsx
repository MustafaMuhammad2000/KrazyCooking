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

const Review = ({ review, rating }) => {
  const { user, id, admin } = useUser();
  return (
    <Card
      alignItems="center"
      sx={{
        justifyContent: "space-between",
        backgroundColor: "#CEE7FF",
        borderRadius: 10,
        border: "none",
        p: 3,
        ml: 15,
        mt: 3,
        display: "flex",
      }}
    >
      <Box sx={{ display: "flex", flexDirecction: "column" }}>
        <Box>
          {/* displaying the author's profile picture, username, and date */}
          <CardHeader
            avatar={
              <Avatar>
                <img src={review.author.profilePicture} height={30} />
              </Avatar>
            }
            title={review.author.username}
            subheader={moment(new Date(review.dateCreated)).fromNow()}
          ></CardHeader>
          <CardContent>
            {/* displaying the review text */}
            <Typography paragraph>{review.body}</Typography>
          </CardContent>
          <CardActions>
            {/* if the logged-in user is the author or an admin, display the delete button */}
            {(review.author._id === id || admin) && (
              <Button
                size="small"
                onClick={() => {
                  deleteReply(`review/${review._id}`, user);
                }}
              >
                Delete
              </Button>
            )}
            {/* displaying the rating */}
            <Rating name="read-only" value={rating} readOnly />
          </CardActions>
        </Box>
      </Box>
      {/* displaying the review picture */}
      {review.picture && (
        <CardMedia
          component="img"
          sx={{ width: 200, height: 200 }}
          image={review.picture}
        />
      )}
    </Card>
  );
};

export default Review;
