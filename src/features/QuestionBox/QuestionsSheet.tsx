import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

import QuestionBox from './QuestionBox';
import yellowLvl from '../../common/Lvls/yellowLvl';
import orangeLvl from '../../common/Lvls/orangeLvl';
import greenLvl from '../../common/Lvls/greenLvl';
import blueLvl from '../../common/Lvls/blueLvl';
import theme from '../../common/themes/theme';
import { RootStateOrAny, useSelector } from 'react-redux';

const StContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-left: solid 2px black;
`;

const QuestionsSheet = () => {
  const stage = useSelector((state: RootStateOrAny) => state.diagnosis.stage);

  const [itemIdx, setItemIdx] = useState(0);

  const focusRefs = useRef<HTMLInputElement[]>([]);
  focusRefs.current = [];

  const addToRefs = (el: HTMLInputElement) => {
    if (el && !focusRefs.current.includes(el)) focusRefs.current.push(el);
  };

  const focusInput = (name: string) => {
    let nextElement = 0;
    const foundEl: HTMLInputElement | undefined = focusRefs.current.find(
      (el: any) => {
        return el.name === name;
      }
    );
    if (foundEl) {
      nextElement = focusRefs.current.indexOf(foundEl) + 1;
      console.log(nextElement);
    }
  };

  useEffect(() => {
    console.log(focusRefs);
    focusRefs.current[itemIdx].focus();
  }, [itemIdx]);

  const yellowQuestions = yellowLvl.map((question) => {
    return (
      <QuestionBox
        focusNext={(name: string) => focusInput(name)}
        refer={addToRefs}
        correct={null}
        disabled={stage >= 1 ? false : true}
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
        disabled={stage >= 2 ? false : true}
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
        disabled={stage >= 3 ? false : true}
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
        disabled={stage >= 4 ? false : true}
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
