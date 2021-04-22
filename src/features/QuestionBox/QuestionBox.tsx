import React, { useEffect, useRef, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { questionCorrect, questionIncorrect } from './questionsSlice';
import { addCorrect, addIncorrect } from '../diagnosis/diagnosisSlice';

interface IProps {
  name: string;
  color: string;
  answers: string[] | string;
  disabled: boolean;
  correct: boolean | null;
  refer: any;
  focusNext: Function;
  lvl: string;
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
  const isFinished = useSelector(
    (state: RootStateOrAny) => state.diagnosis.isFinished
  );

  const [value, setValue] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const preventPaste = (event: React.SyntheticEvent) => {
    event.preventDefault();
    alert('ale proszę nie oszukiwać :|');
  };

  const validateQuestion = (inputValue: string) => {
    if (props.answers.includes(inputValue.toLowerCase())) {
      setIsCorrect(true);
      dispatch(
        questionCorrect({
          question: [props.name, inputValue],
          lvl: props.lvl,
        })
      );
      dispatch(addCorrect());
    } else {
      setIsCorrect(false);
      setValue(props.answers[0]);
      dispatch(addIncorrect());
      dispatch(
        questionIncorrect({
          question: [props.name, inputValue],
          lvl: props.lvl,
        })
      );
    }

    setDone(true);
  };

  const validateOnInput = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') {
      return;
    }
    window.clearTimeout(timer.current);
    event.preventDefault();
    if (!isFinished) {
      props.focusNext(props.name);
    }
  };

  let timer = useRef<number>();

  const onFocusIn = (event: any) => {
    window.clearTimeout(timer.current);

    if (isOn) {
      timer.current = window.setTimeout(() => {
        validateQuestion((event.target as HTMLInputElement).value);
        if (!isFinished) {
          props.focusNext(props.name);
        }
      }, 7000);
    }
  };

  const onFocusOut = (event: any) => {
    if (event.relatedTarget === null && !isFinished) {
      props.focusNext(props.name);
    }
    window.clearTimeout(timer.current);
    validateQuestion((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    window.clearTimeout(timer.current);
  }, [isOn, isFinished]);

  return (
    <div>
      <StContainer>
        <StLabel color={props.color} htmlFor={props.name}>
          {isOn || isFinished ? props.name : '---'}
        </StLabel>
        <StInput
          onKeyPress={(event) => validateOnInput(event)}
          onPaste={(event) => preventPaste(event)}
          onFocus={onFocusIn}
          onBlur={onFocusOut}
          ref={props.refer}
          autoComplete="off"
          ok={isCorrect}
          disabled={!isOn || done}
          onChange={(event) =>
            setValue((event.target as HTMLInputElement).value)
          }
          value={value}
          id={props.name}
          name={props.name}
        />
      </StContainer>
    </div>
  );
};

export default QuestionBox;
