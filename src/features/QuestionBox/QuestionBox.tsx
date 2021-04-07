import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { addCorrect, addIncorrect } from '../diagnosis/diagnosisSlice';

interface IProps {
  name: string;
  color: string;
  answers: string[] | string;
  disabled: boolean;
  correct: boolean | null;
  refer: any;
  focusNext: Function;
}

const StContainer = styled.div`
  border-bottom: solid 2px black;
  font-size: 0.8rem;
  width: auto;
  margin: 0;
  height: 1rem;
  display: flex;
`;

const StInput = styled.input`
  padding: 0;
  text-align: center;
  font-size: inherit;
  border: none;
  border-bottom: solid 2px black;
  border-right: solid 2px black;
  height: inherit;
  width: 10rem;
  background: ${(props) => {
    if (props.disabled === true && props.ok === true) {
      return 'Chartreuse';
    }
    if (props.disabled === true && props.ok === false) {
      return 'red';
    }
    if (props.disabled === false) {
      return 'white';
    }
    if (props.disabled === true) {
      return 'DarkGrey';
    }
  }};
  /* color: ${(props) => (props.disabled ? 'white' : 'black')}; */
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'auto')};
`;

const StLabel = styled.label`
  border-right: solid 2px black;
  border-bottom: solid 2px black;
  text-align: center;
  line-height: 1rem;
  width: 10rem;
  font-weight: bold;
  height: inherit;
  background: ${(props) => props.color || 'white'};
`;

const QuestionBox: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();

  const isOn = useSelector((state: RootStateOrAny) => state.diagnosis.isOn);

  const [value, setValue] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const preventPaste = (event: React.SyntheticEvent) => {
    event.preventDefault();
    alert('ale proszę nie oszukiwać :|');
  };

  const validateQuestion = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();

    if (props.answers.includes(value.toLowerCase())) {
      setIsCorrect(true);
      dispatch(addCorrect([props.name, value]));
    } else {
      setIsCorrect(false);
      setValue(props.answers[0]);
      dispatch(addIncorrect([props.name, value]));
    }

    props.focusNext(props.name);
    setDone(true);
  };

  return (
    <div>
      <StContainer>
        <StLabel color={props.color} htmlFor={props.name}>
          {isOn ? props.name : '---'}
        </StLabel>
        <StInput
          onKeyPress={(event) => validateQuestion(event)}
          onPaste={(event) => preventPaste(event)}
          ref={props.refer}
          autoComplete="off"
          ok={isCorrect}
          disabled={done || props.disabled}
          onChange={(event) =>
            setValue((event.target as HTMLInputElement).value)
          }
          value={value}
          name={props.name}
        />
      </StContainer>
    </div>
  );
};

export default QuestionBox;
