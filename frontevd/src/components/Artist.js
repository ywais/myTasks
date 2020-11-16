import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RcTable from './RcTable';
import AlbumPreview from './AlbumPreview';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

function Artist(props) {
  const [artistData, setArtistData] = useState([{}]);
  const [artistAlbumsData, setArtistAlbumsData] = useState([{}]);

  useEffect(() => {
    const getArtistData = async () => {
      const artistResponse = await axios.get(`http://localhost:3001/artist/${props.match.params.id}`);
      setArtistData(artistResponse.data);
      const artistAlbumsResponse = await axios.get(`http://localhost:3001/artist/${props.match.params.id}/albums`);
      setArtistAlbumsData(artistAlbumsResponse.data);
    };
    getArtistData();
  }, [props.match.params.id]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
      slidesToSlide: 9
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  // see RcTable notes
  const songsArray = (songs) => songs.map((song) => (
    [{Title: song.title, Album: song.album, Length: song.length},
      {songId: song.songId, albumId: song.albumId, myId: song.id}]
  ));

  const addArtistAlbum = (artistAlbums) => artistAlbums.map((artistAlbum, index) => (
    <Link to={`/album/${artistAlbum.id}`} key={index}>
      <AlbumPreview
        key={artistAlbum.id}
        name={artistAlbum.name}
        artist={artistAlbum.artist}
        createdAt={artistAlbum.createdAt}
        coverImg={artistAlbum.coverImg}
      />
    </Link>
  ));

return (
    <div className='full fullArtist'>
      <h1>Artist {props.match.params.id}</h1>
      <div className='info artistInfo'>
        <img src={artistData[0].coverImg} alt={artistData[0].name} className='squareImg'/>
        <div>
          <h2>{artistData[0].name}</h2>
        </div>
      </div>
      <div className='songsTable'>
        <h4>Songs</h4>
        <RcTable songs={songsArray(artistData)} type='artist'/>
      <h4>Albums</h4>
      <Carousel className='carousel artistCarousel' responsive={responsive}>
        {addArtistAlbum(artistAlbumsData)}
      </Carousel>
      </div>
    </div>
  );
}

export default Artist;