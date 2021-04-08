import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import AnswerBox from './AnswerBox';

interface Answers {
  yellow: string[];
  orange: string[];
  green: string[];
  blue: string[];
}

interface IProps {
  goodAnswers: Answers;
  badAnswers: Answers;
}

const StContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-left: solid 2px black;
`;

const AnswersTable: React.FC<IProps> = (props) => {
  const [goodAnswersNum, setGoodAnswersNum] = useState({
    yellow: 0,
    orange: 0,
    green: 0,
    blue: 0,
  });

  const goodIterable = Object.keys(props.goodAnswers);
  const badIterable = Object.keys(props.badAnswers);

  const badAnswers = badIterable.map((key) => {
    const idx: keyof typeof props.badAnswers = key as keyof Answers;
    return props.badAnswers[idx].map((el) => {
      return (
        <AnswerBox
          key={el[0]}
          color={key}
          ok={false}
          question={el[0]}
          answer={el[1]}
        />
      );
    });
  });

  const goodAnswersNumber = useMemo(() => {
    return {
      yellow: 0,
      orange: 0,
      green: 0,
      blue: 0,
    };
  }, []);

  const goodAnswers = goodIterable.map((key) => {
    const idx: keyof typeof props.goodAnswers = key as keyof Answers;
    return props.goodAnswers[idx].map((el) => {
      goodAnswersNumber[idx]++;
      return (
        <AnswerBox
          key={el[0]}
          color={key}
          ok={true}
          question={el[0]}
          answer={el[1]}
        />
      );
    });
  });

  useEffect(() => {
    setGoodAnswersNum(goodAnswersNumber);
  }, [goodAnswersNumber]);

  console.log(goodAnswersNum);

  return (
    <StContainer>
      {goodAnswers}
      {badAnswers}
    </StContainer>
  );
};

export default AnswersTable;
