import React from 'react';
import styled from 'styled-components';
import { BsSpotify } from 'react-icons/bs';

const HomeHeader = ({ username }) => {
  return (
    <Container>
      <LeftContainer>
        <BsSpotify />
        <h6>Artist Search</h6>
      </LeftContainer>
      <p>Hi, {username ?? 'User'}</p>
    </Container>
  );
};

export default HomeHeader;

const Container = styled.div`
  padding: 10px;
  height: 35px;
  background: linear-gradient(
    -90deg,
    rgb(175, 40, 150, 0.5),
    rgb(80, 155, 245, 0.5)
  );
  display: flex;
  align-items: center;
  justify-content: space-between;

  /*small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    height: 45px;
    align-items: flex-start;
    padding-top: 15px;
  }

  p {
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  gap: 10px;

  h6 {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
  }
`;
