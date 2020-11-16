import React from 'react';
import { Link } from 'react-router-dom';
import ArtistPreview from './ArtistPreview';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function TopArtists(props) {
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

  const addArtist = (artists) => artists.map((artist) => (
    <Link to={`/artist/${artist.id}`} key={artist.id}>
      <ArtistPreview
        name={artist.name}
        coverImg={artist.coverImg}
      />
    </Link>
  ));

  return (
    <Carousel className='carousel artistsCarousel' responsive={responsive}>
        {addArtist(props.artists)}
    </Carousel>
  );
}

export default TopArtists;