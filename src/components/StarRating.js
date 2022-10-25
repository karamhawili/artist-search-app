import React, { useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import styled from 'styled-components';

const StarRating = ({ popularity }) => {
  const rating = Math.round((popularity / 20) * 2) / 2; // nearest 0.5

  const isHalfStar = () => {
    return !Number.isInteger(rating);
  };

  const renderHalfStarRating = () => {
    const fillStars = Math.floor(rating);
    const emptyStars = 5 - Math.ceil(rating);

    // console.log('fillStars', fillStars);
    // console.log('emptyStars', emptyStars);

    return (
      <>
        {[...Array(fillStars)].map((star, index) => {
          return <BsStarFill key={index} />;
        })}
        <BsStarHalf />
        {[...Array(emptyStars)].map((star, index) => {
          return <BsStar key={index} />;
        })}
      </>
    );
  };

  const renderStarRating = () => {
    return (
      <>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return index <= rating ? (
            <BsStarFill key={index} />
          ) : (
            <BsStar key={index} />
          );
        })}
      </>
    );
  };

  return (
    <Container>
      {isHalfStar() ? renderHalfStarRating() : renderStarRating()}
    </Container>
  );
};

export default StarRating;

const Container = styled.div`
  display: flex;
  align-items: center;
`;
