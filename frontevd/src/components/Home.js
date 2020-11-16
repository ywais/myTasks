import React, { useEffect, useState } from 'react';
import TopSongs from './TopSongs.js';
import TopArtists from './TopArtists.js';
import TopAlbums from './TopAlbums.js';
import TopPlaylists from './TopPlaylists.js';
import axios from 'axios';

function Home() {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const getTop20s = async () => {
      const songsResponse = await axios.get('http://localhost:3001/top_songs');
      setSongs(songsResponse.data);
      const artistsResponse = await axios.get('http://localhost:3001/top_artists');
      setArtists(artistsResponse.data);
      const albumsResponse = await axios.get('http://localhost:3001/top_albums');
      setAlbums(albumsResponse.data);
      const playlistsResponse = await axios.get('http://localhost:3001/top_playlists');
      setPlaylists(playlistsResponse.data);
    };
    getTop20s();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <h2>Top Songs</h2>
      <TopSongs songs={songs}/>
      <h2>Top Artists</h2>
      <TopArtists artists={artists}/>
      <h2>Top Albums</h2>
      <TopAlbums albums={albums}/>
      <h2>Top Playlists</h2>
      <TopPlaylists playlists={playlists}/>
    </div>
  );
}

export default Home;