import React from 'react';
import { BsSpotify } from 'react-icons/bs';
import styled from 'styled-components';
import { useSpotify } from '../hooks/useSpotify';

const Login = () => {
  const { login, isLoading } = useSpotify();

  return (
    <Container>
      <BackIcon size={'calc(50vw - 50px)'} color={'#00000008'} />
      <Title>Artist Search</Title>
      <Button onClick={() => login()} disabled={isLoading}>
        Login
        <BtnIcon color="#1fdf64" size={'30px'} />
      </Button>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;

  /*small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    gap: 50px;
  }
`;

const Title = styled.h1`
  font-size: 10rem;
  letter-spacing: -0.04em;
  color: #1fdf64;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;
  margin-inline: 5px;
  /* color: black; */
  background: -webkit-linear-gradient(
    180deg,
    rgb(175, 40, 150),
    rgb(80, 155, 245)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /*small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    font-size: 7rem;
  }
`;

const BackIcon = styled(BsSpotify)`
  position: absolute;

  /*small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: calc(100vw - 10px);
    height: calc(100vw - 10px);
  }
`;

const BtnIcon = styled(BsSpotify)`
  position: absolute;
  right: 20px;

  /*small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  background-color: black;
  color: white;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 0.05em;
  text-align: center;
  width: 20%;
  height: 45px;
  border-radius: 40px;
  padding: 10px;
  position: relative;

  /*small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
    width: 40%;
    border-radius: 40px;
    height: 30px;
  }

  &:hover {
    background-color: #121212;
  }

  &:disabled {
    background-color: #141a1b;
  }
`;
