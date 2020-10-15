import React from 'react';

function Comment({ comment, index }) {
  return (
    <div className='comment' key={index}>
      <p>{comment.content}</p>
      <h6>{comment.name}</h6>
    </div>
  )
}

export default Comment;