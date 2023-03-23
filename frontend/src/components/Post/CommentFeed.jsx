import React, { useState } from "react";
import moment from "moment";
import Popup from "./Popup";
import styled from "@emotion/styled";
import ReviewForm from "./ReviewForm";
import { useUser } from "../../utils/UserContext";
import { deleteReply } from "../../utils/fetchFromApi";
import Comment from "./Comment";
import { Box } from "@mui/material";
import Review from "./Review";

const CommentInput = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const CommentFeed = ({ comments }) => {
  const { id, user, admin } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [commentOwner, setCommentOwner] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [ratingValue, setRating] = useState(0);
  const togglePopup = (id) => {
    setCommentId(id);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {comments.map((comment, index) => (
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

  // return (
  //   <div>
  //     <h3>CommentFeed</h3>
  //     <ul>
  //       {comments.map((comment, index) => (
  //         <li key={index}>
  //           <Comment comment={comment} />
  //           {/* Recipe body */}
  //           <h2>Recipe</h2> <br />
  //           Body: {comment.body} <br />
  //           Author: {comment.author.username} <br />
  //           Profile: <img src={comment.author.profilePicture} height={40} />
  //           <br />
  //           Upvotes: {comment.upvotes} <br />
  //           Picture: <img src={comment.picture} height={100} /> <br />
  //           Date: {moment(new Date(comment.dateCreated)).fromNow()} <br />
  //           {/* Reply Button */}
  //           <input
  //             type="button"
  //             value="Reply"
  //             onClick={() => togglePopup(comment._id)}
  //           />
  //           {/* Delete Recipe Button */}
  //           {(comment.author._id === id || admin) && (
  //             <input
  //               type="button"
  //               value="Delete"
  //               onClick={() => {
  //                 deleteReply(`recipe/${comment._id}`, user);
  //               }}
  //             />
  //           )}
  {
    /* Review Popup */
  }
  // {isOpen && (
  //   <Popup
  //     content={
  //       <>
  //         {/* <CommentInput placeholder="Leave your review..." />
  //         <button>Review</button> */}

  //         <ReviewForm recipeId={commentId} />
  //       </>
  //     }
  //     handleClose={togglePopup}
  //   />
  // )}
  //           <ul>
  //             {comment.reviews.map((review, reviewIndex) => (
  //               <li key={reviewIndex}>
  //                 <h2>Review</h2> <br />
  //                 Body: {review.body} <br />
  //                 Rating: {review.rating} <br />
  //                 Picture:{" "}
  //                 <img
  //                   src={review.picture}
  //                   alt="post-picture"
  //                   height={100}
  //                 />{" "}
  //                 <br />
  //                 author: {review.author.username} <br />
  //                 profile picture:
  //                 <img src={review.author.profilePicture} height={40} /> <br />
  //                 date: {moment(new Date(review.dateCreated)).fromNow()} <br />
  //                 {/* Delete Button */}
  //                 {(review.author._id === id || admin) && (
  //                   <input
  //                     type="button"
  //                     value="Delete"
  //                     onClick={() => {
  //                       deleteReply(`review/${review._id}`, user);
  //                     }}
  //                   />
  //                 )}
  //               </li>
  //             ))}
  //           </ul>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default CommentFeed;
