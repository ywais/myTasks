import React, { useEffect, useState } from 'react';
import RcTable from './RcTable';
import axios from 'axios';

function Playlist(props) {
  const [playlistData, setPlaylistData] = useState([{}]);

  useEffect(() => {
    const getPlaylistData = async () => {
      const { data } = await axios.get(`http://localhost:3001/playlist/${props.match.params.id}`);
      setPlaylistData(data);
    };
    getPlaylistData();
  }, [props.match.params.id]);

  // see RcTable notes
  const songsArray = (songs) => songs.map((song) => (
    [{Title: song.title, Artist: song.artist, Length: song.length},
      {songId: song.songId, artistId: song.artistId, myId: song.id}]
  ));

  return (
    <div className='full fullPlaylist'>
      <h1>Playlist {props.match.params.id}</h1>
      <div className='info playlistInfo'>
        <img src={playlistData[0].coverImg} alt={playlistData[0].name} className='squareImg'/>
        <div>
          <h2>{playlistData[0].name}</h2>
          <p>{playlistData[0].createdAt}</p>
        </div>
      </div>
      <div className='songsTable'>
        <h4>Songs</h4>
        <RcTable songs={songsArray(playlistData)} type='playlist'/>
      </div>
    </div>
  );
}

export default Playlist;