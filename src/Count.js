import React from 'react';

function Count({ comments }) {
  const count = comments.length;

  if(count > 0 && count % 3 === 0) {
    throw Error('Something went wrong');
  }

  return (
    <span>{count}</span>
  )
}

export default Count;