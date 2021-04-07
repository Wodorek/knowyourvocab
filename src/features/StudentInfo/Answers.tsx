import React from 'react';
import styled from 'styled-components';

interface IProps {
  answers: string[] | undefined;
}

const StContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const StParagraph = styled.p`
  font-size: 1.5rem;
`;

const Answers: React.FC<IProps> = (props) => {
  let content;
  if (props.answers) {
    content = props.answers.map((el) => {
      return (
        <StContainer key={`${el[0]}${el[1]}`}>
          <StParagraph>{el[0]}</StParagraph>
          <StParagraph>{el[1]}</StParagraph>
        </StContainer>
      );
    });
  }

  return <div>{content}</div>;
};

export default Answers;
