import React from 'react';
import { Link } from 'react-router-dom';
import SongPreview from './SongPreview';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function TopSongs(props) {
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

  const addSong = (songs) => songs.map((song) => (
    <Link to={`/song/${song.id}`} key={song.id}>
      <SongPreview
        title={song.title}
        length={song.length}
        artist={song.artist}
        thumbnails={song.thumbnails}
      />
    </Link>
  ));

  return (
    <Carousel className='carousel songsCarousel' responsive={responsive}>
        {addSong(props.songs)}
    </Carousel>
  );
}

export default TopSongs;