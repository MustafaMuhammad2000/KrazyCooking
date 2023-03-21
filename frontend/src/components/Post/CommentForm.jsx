import React, {useState} from 'react'
import { postComment } from '../../utils/fetchFromApi';
import styled from '@emotion/styled';

const post = { postId: '64190e2b00157c19240f50cd',
    commentBody: 'this is a comment'};

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
  

const CommentForm = ({postId}) => {

    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() === '') return;

        const res = postComment(JSON.stringify({body: comment}), postId);
        console.log(res);

        setComment('');
    };

    return (
    <Container>
        <form onSubmit={handleSubmit}>
            <CommentInput
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
            />
            <SubmitButton type="submit">Submit</SubmitButton>
        </form>
    </Container>
    );
}

export default CommentForm