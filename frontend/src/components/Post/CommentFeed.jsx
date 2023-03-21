import React from 'react'




const CommentFeed = ({ comments }) => {
    console.log(comments)
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
                    Date: {comment.dateCreated} <br/>
                    <ul>
                        {comment.reviews.map((review, reviewIndex) => (
                            <li key = {reviewIndex}>
                                <h2>Review</h2> <br/>
                                Body: {review.body} <br/>
                                Rating: {review.rating} <br/>
                                Picture: <img src={review.picture} alt="post-picture" height={100}/> <br/>
                                author: {review.author} <br/>
                                date: {review.dateCreated} <br/>
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