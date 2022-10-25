import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import HomeHeader from '../components/HomeHeader';
import { useSpotify } from '../hooks/useSpotify';

const Home = () => {
  const { user } = useSpotify();

  return (
    <Container>
      <HomeHeader username={user?.display_name} />
      <Outlet />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fefefe;
`;
