import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSpotify } from '../hooks/useSpotify';
import StarRating from './StarRating';

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  const browseArtistAlbums = () => {
    navigate(`/home/artist-albums?id=${artist?.id}`);
  };

  return (
    <Card onClick={browseArtistAlbums}>
      <ImageContainer>
        {artist.images[1] ? (
          <img src={`${artist.images[1].url}`} />
        ) : (
          <FallbackImage />
        )}
      </ImageContainer>
      <CardInfoContainer>
        <NameFollowersContainer>
          <h3>{artist.name}</h3>
          <p>
            {artist.followers.total.toLocaleString('en', { useGrouping: true })}{' '}
            followers
          </p>
        </NameFollowersContainer>
        <StarRating popularity={artist.popularity} />
      </CardInfoContainer>
    </Card>
  );
};

export default ArtistCard;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: left;
  border-radius: 8px;
  margin: 20px;
  padding: 10px;
  background: linear-gradient(
    180deg,
    rgb(248, 249, 249, 0.8),
    rgb(208, 211, 212, 0.2)
  );
  color: #222222;
  cursor: pointer;
  //box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.06);

  &:hover {
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 1;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const FallbackImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #509bf5;
`;

const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  h3 {
    font-family: 'Montserrat', sans-serif;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }

  p {
    font-family: 'Quicksand', sans-serif;
  }
`;

const NameFollowersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
