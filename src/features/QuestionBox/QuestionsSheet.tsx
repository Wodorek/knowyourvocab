import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import QuestionBox from './QuestionBox';
import yellowLvl from '../../common/Lvls/yellowLvl';
import orangeLvl from '../../common/Lvls/orangeLvl';
import greenLvl from '../../common/Lvls/greenLvl';
import blueLvl from '../../common/Lvls/blueLvl';
import theme from '../../common/themes/theme';

const StContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-left: solid 2px black;
`;

const QuestionsSheet = () => {
  const focusRefs = useRef<HTMLInputElement[]>([]);
  focusRefs.current = [];

  const addToRefs = (el: HTMLInputElement) => {
    if (el && !focusRefs.current.includes(el)) focusRefs.current.push(el);
  };

  const getNextElement = (idx: number): HTMLInputElement => {
    const nextItem = focusRefs.current[idx];
    console.log(nextItem);
    if (nextItem === undefined) {
      return getNextElement(0);
    }
    if (nextItem.disabled) {
      return getNextElement(idx + 1);
    }

    return nextItem;
  };

  const focusInput = (name: string) => {
    const foundElIdx = focusRefs.current.findIndex((el: HTMLInputElement) => {
      return el.name === name;
    });
    const nextElement = getNextElement(foundElIdx + 1);

    nextElement.focus();
  };

  useEffect(() => {
    focusRefs.current[0].focus();
  }, []);

  const yellowQuestions = yellowLvl.map((question) => {
    return (
      <QuestionBox
        focusNext={(name: string) => focusInput(name)}
        refer={addToRefs}
        correct={null}
        disabled={false}
        key={`${question[0]}`}
        name={`${question[0]}`}
        color={theme.yellow}
        answers={question[1]}
      />
    );
  });

  const orangeQuestions = orangeLvl.map((question) => {
    return (
      <QuestionBox
        focusNext={(name: string) => focusInput(name)}
        refer={addToRefs}
        correct={null}
        disabled={false}
        key={`${question[0]}`}
        name={`${question[0]}`}
        color={theme.orange}
        answers={question[1]}
      />
    );
  });
  const greenQuestions = greenLvl.map((question) => {
    return (
      <QuestionBox
        focusNext={(name: string) => focusInput(name)}
        refer={addToRefs}
        correct={null}
        disabled={false}
        key={`${question[0]}`}
        name={`${question[0]}`}
        color={theme.green}
        answers={question[1]}
      />
    );
  });
  const blueQuestions = blueLvl.map((question) => {
    return (
      <QuestionBox
        focusNext={(name: string) => focusInput(name)}
        refer={addToRefs}
        correct={null}
        disabled={false}
        key={`${question[0]}`}
        name={`${question[0]}`}
        color={theme.blue}
        answers={question[1]}
      />
    );
  });

  return (
    <StContainer>
      {yellowQuestions}
      {orangeQuestions}
      {greenQuestions}
      {blueQuestions}
    </StContainer>
  );
};

export default QuestionsSheet;
