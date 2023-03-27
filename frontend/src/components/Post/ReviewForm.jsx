import React, { useState } from "react";
import { postReview } from "../../utils/fetchFromApi";
//import { styled } from "@emotion/styled";
import { useUser } from "../../utils/UserContext";

import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  z-index: 1;
`;

const CommentInput = styled("textarea")`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const SubmitButton = styled("button")`
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

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

// Contains custom icons and labels for each rating value
const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const ReviewForm = ({ recipeId }) => {
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [value, setValue] = React.useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      window.alert("review cannot be empty");
      return;
    }

    if (user === null) {
      console.error("USER ISNT LOGGED IN!");
      window.alert("you must be logged in to leave a review!");
      return;
    }

    if (image === "") {
      window.alert("you must add an image to your review");
      return;
    }

    if (comment.length <= 5 || comment.length >= 1000) {
      window.alert(
        `your review was ${comment.length} characters, it must be over 5 and less than 1000 characters`
      );
      return;
    }

    let data = new FormData();
    data.append("image", image);
    data.append("body", comment);
    data.append("rating", value);

    postReview(data, recipeId, user);

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

        <StyledRating
          name="highlight-selected-only"
          defaultValue={3}
          IconContainerComponent={IconContainer}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          highlightSelectedOnly
        />

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </Container>
  );
};

export default ReviewForm;
