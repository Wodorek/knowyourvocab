import React from 'react';
import styled from 'styled-components';
import LoadingSpinner from './LoadingSpinner';

interface IProps {
  message: string;
}

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingScreen: React.FC<IProps> = (props) => {
  return (
    <StContainer>
      <h1>{props.message}</h1>
      <LoadingSpinner />
    </StContainer>
  );
};

export default LoadingScreen;
