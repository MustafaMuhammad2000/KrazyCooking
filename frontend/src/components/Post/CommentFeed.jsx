import React, { useState } from "react";
import moment from "moment";
import Popup from "./Popup";
import { styled } from "@mui/material/styles";
import ReviewForm from "./ReviewForm";
import { useUser } from "../../utils/UserContext";
import { deleteReply } from "../../utils/fetchFromApi";
import Comment from "./Comment";
import { Box, Button, Menu, MenuItem, Fade } from "@mui/material";
import Review from "./Review";

const CommentInput = styled("textarea")`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const SortButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  padding: "6px 18px",
  border: "2px solid",
  borderRadius: 30,
  lineHeight: 1.5,
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
});

const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);

  return sum / reviews.length;
};

const CommentFeed = ({ comments }) => {
  const [sortedComments, setSortedComments] = useState(comments);

  const sortByHighestRating = () => {
    const sorted = [...sortedComments].sort((a, b) => {
      const aAverageRating = calculateAverageRating(a.reviews);
      const bAverageRating = calculateAverageRating(b.reviews);
      return bAverageRating - aAverageRating;
    });
    setSortedComments(sorted);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortByNewest = () => {
    const sorted = [...sortedComments].sort((a, b) => {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    });
    setSortedComments(sorted);
  };

  return (
    <div>
      <SortButton
        id="sort-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Sort By
      </SortButton>
      <Menu
        id="sort-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            sortByNewest();
          }}
        >
          Newest
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setSortedComments(comments);
          }}
        >
          Oldest
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            sortByHighestRating();
          }}
        >
          Rating
        </MenuItem>
      </Menu>

      {sortedComments.map((comment, index) => (
        <Box key={comment._id} mt={5}>
          <Comment comment={comment} />
          {comment.reviews.map((review, reviewIndex) => (
            <Box key={review._id}>
              <Review review={review} rating={review.rating} />
            </Box>
          ))}
        </Box>
      ))}
    </div>
  );
};

export default CommentFeed;
