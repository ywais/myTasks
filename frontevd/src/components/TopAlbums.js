import React from 'react';
import { Link } from 'react-router-dom';
import AlbumPreview from './AlbumPreview';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function TopAlbums(props) {
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

  const addAlbum = (albums) => albums.map((album) => (
    <Link to={`/album/${album.id}`} key={album.id}>
      <AlbumPreview
        name={album.name}
        artist={album.artist}
        createdAt={album.createdAt}
        coverImg={album.coverImg}
      />
    </Link>
  ));

  return (
    <Carousel className='carousel albumsCarousel' responsive={responsive}>
        {addAlbum(props.albums)}
    </Carousel>
  );
}

export default TopAlbums;