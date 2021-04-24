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
  //TODO real end message
  return (
    <StContainer>
      <h1>Dziękuję za wypełnienie testu, do zobaczenia na lekcji 😊</h1>
    </StContainer>
  );
};

export default EndMessage;
