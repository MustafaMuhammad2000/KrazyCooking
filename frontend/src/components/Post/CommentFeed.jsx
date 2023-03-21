import React, {useState} from 'react'
import moment from 'moment';
import Popup from './Popup';
import styled from '@emotion/styled';

const CommentInput = styled.textarea`
    width: 100%;
    height: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
`;


const CommentFeed = ({ comments }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

  return (
    <div>
        <h3>CommentFeed</h3>
        <ul>
            {comments.map((comment, index) => (
                // <Comment />
                <li key = {index}>
                    <h2>Recipe</h2> <br/>
                    Body: {comment.body} <br/>
                    Author: {comment.author} <br/>
                    Upvotes: {comment.upvotes} <br/>
                    Date: {moment(new Date(comment.dateCreated)).fromNow()} <br/>
                    <input 
                        type = "button"
                        value = "Reply"
                        onClick={togglePopup}/>
                    {isOpen && <Popup
                        content={<>
                            <CommentInput 
                                placeholder="Leave your review..."
                                />
                            <button>Review</button>
                        </>}
                        handleClose={togglePopup}
                    />}

                    <ul>
                        {comment.reviews.map((review, reviewIndex) => (
                            <li key = {reviewIndex}>
                                <h2>Review</h2> <br/>
                                Body: {review.body} <br/>
                                Rating: {review.rating} <br/>
                                Picture: <img src={review.picture} alt="post-picture" height={100}/> <br/>
                                author: {review.author} <br/>
                                date: {moment(new Date(review.dateCreated)).fromNow()} <br/>
                            </li>
                        ))}
                    </ul>
                </li>
                
            ))}
        </ul>
    </div>
    
  )
}

export default CommentFeed