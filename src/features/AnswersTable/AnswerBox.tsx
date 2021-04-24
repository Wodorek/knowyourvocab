import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import theme from '../../common/themes/theme';
import { calculate, changeToCorrect, changeToIncorrect } from './answersSlice';

interface IProps {
  question: string;
  answer: string;
  ok: boolean;
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

const StQuestion = styled.div`
  border-right: solid 2px black;
  border-bottom: solid 2px black;
  text-align: center;
  line-height: 1rem;
  width: 10rem;
  font-weight: bold;
  height: inherit;
  background: ${(props) => {
    if (props.color) {
      const idx = props.color as keyof typeof theme;
      return theme[idx];
    }
  }};
  user-select: none;
`;

const StAnswer = styled.div<{ ok: boolean | null }>`
  padding: 0;
  text-align: center;
  font-size: inherit;

  border: none;
  border-bottom: solid 2px black;
  border-right: solid 2px black;
  height: inherit;
  width: 10rem;
  background: ${(props) => (props.ok ? 'chartreuse' : 'orangeRed')};
  user-select: none;
`;

const AnswerBox: React.FC<IProps> = (props) => {
  const [ok, setOk] = useState(props.ok);

  const dispatch = useDispatch();

  const changeQuestionStatus = () => {
    setOk((prevOk) => !prevOk);

    if (ok) {
      dispatch(changeToIncorrect(props.color));
    }
    if (!ok) {
      dispatch(changeToCorrect(props.color));
    }

    dispatch(calculate(props.color));
  };

  return (
    <StContainer onClick={changeQuestionStatus}>
      <StQuestion color={props.color}>{props.question}</StQuestion>
      <StAnswer ok={ok}>{props.answer}</StAnswer>
    </StContainer>
  );
};

export default AnswerBox;
