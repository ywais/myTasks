import React from 'react';

function PlaylistPreview(props) {
  return (
    <div className='preview playlistPreview'>
      <img src={props.coverImg} alt={props.name} className='squareImg'/>
      <h4>{props.name}</h4>
    </div>
  );
}

export default PlaylistPreview;