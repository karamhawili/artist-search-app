import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import AlbumCard from '../components/AlbumCard';
import StarRating from '../components/StarRating';
import { useSpotify } from '../hooks/useSpotify';

const ArtistAlbums = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { fetchArtistAlbums, fetchArtistInfo, isLoggedIn } = useSpotify();
  const [artistAlbums, setArtistAlbums] = useState(null);
  const [artist, setArtist] = useState(null);

  console.log(params.get('id'));

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albums = await fetchArtistAlbums(params.get('id'));
        setArtistAlbums(albums);
        console.log('Albums', albums);
      } catch (err) {
        console.log('error fetching data', err);
        if (err.message === 'Token expired') navigate('/');
      }
    };

    fetchAlbums();
  }, []);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const artistInfo = await fetchArtistInfo(params.get('id'));
        setArtist(artistInfo);
        console.log('Artist', artistInfo);
      } catch (err) {
        console.log('error fetching data', err);
        if (err.message === 'Token expired') navigate('/');
      }
    };

    fetchArtist();
  }, []);

  return (
    <Container>
      <ArtistInfoContainer>
        <ArtistImageWrapper>
          {artist?.images[1] ? (
            <img src={`${artist?.images[1]?.url}`} />
          ) : (
            <FallbackImage />
          )}
        </ArtistImageWrapper>
        <ArtistInfoWrapper>
          <h3>{artist?.name}</h3>
          <p>Albums</p>
        </ArtistInfoWrapper>
      </ArtistInfoContainer>

      <ArtistAlbumsContainer>
        {artistAlbums?.items?.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </ArtistAlbumsContainer>
    </Container>
  );
};

export default ArtistAlbums;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-inline: 5%;

  /*small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    margin-inline: 2%;
  }
`;

const ArtistInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(208, 211, 212, 0.4);
  margin-top: 20px;
  margin-bottom: 20px;
  padding-inline: 2rem;

  /*small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    gap: 5px;
  }
`;

const ArtistImageWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 160px;
  aspect-ratio: 1 / 1;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);

  /*small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 150px;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const ArtistInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 20px;
  padding: 10px;

  /*small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    gap: 12px;
  }

  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 3rem;
    letter-spacing: -0.04em;

    /*small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-family: 'Quicksand', sans-serif;
    font-size: 1.8rem;
  }
`;

const ArtistAlbumsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
`;

const FallbackImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #509bf5;
`;
