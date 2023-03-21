import React, {useState} from 'react'
import { postComment } from '../../utils/fetchFromApi';

const post = { postId: '64190e2b00157c19240f50cd',
    commentBody: 'this is a comment'};

    const body = JSON.stringify({
        body: "THIS IS A COMMENT"
    })

const CommentForm = () => {
    const [response, setResponse] = useState(null);

    const handleSubmit = async () => {
        const res = await postComment(body, post.postId);
        setResponse(res);
    };

  return (
    <div>
        CommentForm
        <button onClick={handleSubmit}>Post Comment</button>
        {response && <div>Response: {JSON.stringify(response)}</div>}
    </div>
    
  )
}

export default CommentForm