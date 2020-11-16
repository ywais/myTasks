import React from 'react';

function ArtistPreview(props) {
  return (
    <div className='preview artistPreview'>
      <img src={props.coverImg} alt={props.name} className='roundImg'/>
      <h4 className='artistName'>{props.name}</h4>
    </div>
  );
}

export default ArtistPreview;