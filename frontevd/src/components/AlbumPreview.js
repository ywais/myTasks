import React from 'react';

function AlbumPreview(props) {
  return (
    <div className='preview albumPreview'>
      <img src={props.coverImg} alt={props.name} className='squareImg'/>
      <h4>{props.name}</h4>
      <p>{props.artist} • {new Date(props.createdAt).getFullYear()}</p>
    </div>
  );
}

export default AlbumPreview;