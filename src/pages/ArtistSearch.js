import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { useSpotify } from '../hooks/useSpotify';
import { useNavigate } from 'react-router-dom';
import ArtistCard from '../components/ArtistCard';

const SEARCH_QUERY = 'USER_SEARCH_QUERY';

const ArtistSearch = () => {
  const [query, setQuery] = useState(
    sessionStorage.getItem(SEARCH_QUERY) ?? null
  );
  const [searchResults, setSearchResults] = useState(null);

  console.log('SearchResults', searchResults);

  const { fetchSearchResults } = useSpotify();
  const navigate = useNavigate();

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    sessionStorage.setItem(SEARCH_QUERY, event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const limit = 42;
  const type = 'artist';

  useEffect(() => {
    if (query === null) return;

    if (query === '') {
      setSearchResults(null);
      return;
    }

    const fetchData = async () => {
      try {
        // console.log(query, type, limit);
        const data = await fetchSearchResults(query, type, limit);
        setSearchResults(data);
        // console.log(`Search results for query=${query}`, data);
      } catch (err) {
        console.log('error fetching data', err);
        if (
          err.message === 'Token expired' ||
          err.message === 'Invalid access token'
        )
          navigate('/');
      }
    };

    fetchData();
  }, [query]);

  return (
    <Container>
      <ArtistSearchForm onSubmit={handleFormSubmit}>
        <InputWrapper>
          <SearchIcon />
          <Input
            placeholder="Search for an artist..."
            value={query}
            onChange={handleQueryChange}
          />
        </InputWrapper>
      </ArtistSearchForm>
      <ArtistCardsContainer>
        {searchResults?.artists?.items.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </ArtistCardsContainer>
    </Container>
  );
};

export default ArtistSearch;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArtistCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
`;

const ArtistSearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  height: 68px;
  width: 40%;
  position: relative;

  /*small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    height: 50px;
    width: 70%;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  border: 0;
  outline: none;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.04);
  padding-left: 60px;
  font-size: 100%;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
  transform: translateY(-50%);

  &::placeholder {
    color: gray;
  }
`;

const SearchIcon = styled(BsSearch)`
  position: absolute;
  left: 20px;
  z-index: 10;
  transform: translateY(-50%);
  color: gray;
`;
