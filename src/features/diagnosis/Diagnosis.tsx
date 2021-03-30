import React from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import QuestionsSheet from '../QuestionBox/QuestionsSheet';

const StContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(60rem + 14px);
  @media (max-width: 974px) {
    width: calc(40rem + 14px);
  }
`;

const Diagnosis = () => {
  return (
    <StContainer>
      <Header />
      <QuestionsSheet />
    </StContainer>
  );
};

export default Diagnosis;
