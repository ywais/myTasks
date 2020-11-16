import React from 'react';
import { Link } from 'react-router-dom';
import PlaylistPreview from './PlaylistPreview';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function TopPlaylists(props) {
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

  const addPlaylist = (playlists) => playlists.map((playlist) => (
    <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
      <PlaylistPreview
        name={playlist.name}
        coverImg={playlist.coverImg}
      />
    </Link>
  ));

  return (
    <Carousel className='carousel playlistsCarousel' responsive={responsive}>
        {addPlaylist(props.playlists)}
    </Carousel>
  );
}

export default TopPlaylists;