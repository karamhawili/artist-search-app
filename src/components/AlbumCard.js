import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AlbumCard = ({ album }) => {
  const goToAlbum = () => {
    const url = album?.external_urls?.spotify;
    window.open(url, '_blank');
  };

  return (
    <Card onClick={goToAlbum}>
      <ImageContainer>
        {album.images[1] ? (
          <img src={`${album.images[1].url}`} />
        ) : (
          <FallbackImage />
        )}
      </ImageContainer>
      <CardInfoContainer>
        <UpperCardInfo>
          <h3>{album.name}</h3>
          <p>{album.artists.map((artist) => artist.name).join(', ')}</p>
        </UpperCardInfo>
        <LowerCardInfo>
          <p>{album.release_date}</p>
          <p>{album.total_tracks} tracks</p>
        </LowerCardInfo>
      </CardInfoContainer>
      <PreviewButton>Preview on Spotify</PreviewButton>
    </Card>
  );
};

export default AlbumCard;

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
  position: relative;

  //box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.06);

  &:hover {
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.1);

    button {
      display: block;
    }
  }
`;

const PreviewButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: #111111;
  color: white;
  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  text-align: center;
  border-radius: 20px;
  padding: 12px;
  margin: 10px;
  position: absolute;
  z-index: 50;
  bottom: 0;
  right: 0;
  display: none;

  &:hover {
    background-color: #222222;
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
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }
`;

const UpperCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const LowerCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
