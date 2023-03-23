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

const Review = ({ review }) => {
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
            <Typography paragraph>{review.body}</Typography>
          </CardContent>
          <CardActions>
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
          </CardActions>
        </Box>
      </Box>
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
