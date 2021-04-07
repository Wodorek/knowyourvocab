import React from 'react';
import styled from 'styled-components';
import AnswerBox from './AnswerBox';

interface IProps {
  goodAnswers: string[];
  badAnswers: string[];
}

const StContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-left: solid 2px black;
`;

const AnswersTable: React.FC<IProps> = (props) => {
  const goodAnswers = props.goodAnswers.map((el) => {
    return <AnswerBox color="green" question={el[0]} answer={el[1]} />;
  });
  const badAnswers = props.badAnswers.map((el) => {
    return <AnswerBox color="red" question={el[0]} answer={el[1]} />;
  });

  return (
    <StContainer>
      {goodAnswers}
      {badAnswers}
    </StContainer>
  );
};

export default AnswersTable;
