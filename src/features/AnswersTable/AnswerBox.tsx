import React from 'react';
import styled from 'styled-components';

interface IProps {
  question: string;
  answer: string;
  color: string;
}

const StContainer = styled.div`
  border-bottom: solid 2px black;
  font-size: 0.8rem;
  width: auto;
  margin: 0;
  height: 1rem;
  display: flex;
`;

const StAnswer = styled.div`
  padding: 0;
  text-align: center;
  font-size: inherit;
  border: none;
  border-bottom: solid 2px black;
  border-right: solid 2px black;
  height: inherit;
  width: 10rem;
  background: ${(props) => props.color};
`;

const StQuestion = styled.div`
  border-right: solid 2px black;
  border-bottom: solid 2px black;
  text-align: center;
  line-height: 1rem;
  width: 10rem;
  font-weight: bold;
  height: inherit;
`;

const AnswerBox: React.FC<IProps> = (props) => {
  return (
    <StContainer>
      <StQuestion>{props.question}</StQuestion>
      <StAnswer color={props.color}>{props.answer}</StAnswer>
    </StContainer>
  );
};

export default AnswerBox;
