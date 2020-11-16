import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RcTable from './RcTable';
import qs from 'qs';
import axios from 'axios';

function Song(props) {
  const [songData, setSongData] = useState([{}]);
  const paersedQuery = qs.parse(props.location.search, { ignoreQueryPrefix: true }); // query params as object

  useEffect(() => {
    const getSongData = async () => {
      const { data } = await axios.get(`http://localhost:3001/song/${props.match.params.id}?${Object.keys(paersedQuery)[0]}=${paersedQuery[Object.keys(paersedQuery)[0]]}`);
      setSongData(data);
    };
    getSongData();
  }, [props.match.params.id]);

  // see RcTable notes
  const songsArray = (songs) => songs.map((song) => (
    [{Title: song.title, Artist: song.artist, Length: song.length},
      {songId: song.songId, artistId: song.artistId, myId: song.id}]
  ));

  return (
    <div className='full fullSong'>
      <h1>Song {props.match.params.id}</h1>
      <section className={songData.length > 1 ? 'split' : 'noSplit'}>
        <div className='info songInfo'>
          <iframe
          title={songData[0].title}
          width='560' height='315'
          src={`https://www.youtube.com/embed/${songData[0].youtubeLink?songData[0].youtubeLink.substring(17):''}`}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen>
          </iframe>
          <div>
            <h2>{songData[0].title}</h2>
            <Link to={`/artist/${songData[0].artistId}`}><h3>{songData[0].artist}</h3></Link>
            <p><Link to={`/album/${songData[0].albumId}`}>{songData[0].album}</Link> {songData[0].trackNumber ? `${songData[0].trackNumber}.` : ''} {songData[0].length}</p>
            <h4>Lyrics:</h4>
            <p>{songData[0].lyrics}</p>
          </div>
        </div>
        {/* show more songs if query params */}
        {songData.length > 1 ?
          <div className='songsTable'>
            <h4>More Songs</h4>
            <RcTable songs={songsArray(songData[1])} type={Object.keys(paersedQuery)[0]}/>
          </div>
        : ''}
      </section>
    </div>
  );
}

export default Song;