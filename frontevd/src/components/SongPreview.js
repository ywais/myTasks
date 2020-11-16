import React from 'react';

function SongPreview(props) {
  return (
    <div className='preview songPreview'>
      <img src={props.thumbnails} alt={props.title} className='squareImg'/>
      <h4>{props.title}</h4>
      <p>{props.length} • {props.artist}</p>
    </div>
  );
}

export default SongPreview;