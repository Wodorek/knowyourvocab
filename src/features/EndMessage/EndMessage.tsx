import React from 'react';
import styled from 'styled-components';

const StContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EndMessage = () => {
  return (
    <StContainer>
      <h1>No i dzięki za to wypełnienie</h1>
    </StContainer>
  );
};

export default EndMessage;
