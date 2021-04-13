import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import QuestionBox from './QuestionBox';
import { yellowLvl } from '../../common/Lvls/yellowLvl';
import { orangeLvl } from '../../common/Lvls/orangeLvl';
import { greenLvl } from '../../common/Lvls/greenLvl';
import { blueLvl } from '../../common/Lvls/blueLvl';
import theme from '../../common/themes/theme';
import { RootStateOrAny, useSelector } from 'react-redux';

const StContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-left: solid 2px black;
`;

const QuestionsSheet = () => {
  const focusRefs = useRef<HTMLInputElement[]>([]);
  focusRefs.current = [];

  const isOn = useSelector((state: RootStateOrAny) => state.diagnosis.isOn);

  const totalFinished = useSelector(
    (state: RootStateOrAny) => state.diagnosis.totalFinished
  );

  const lvls = [yellowLvl, orangeLvl, greenLvl, blueLvl];

  const addToRefs = (el: HTMLInputElement) => {
    if (el && !focusRefs.current.includes(el)) focusRefs.current.push(el);
  };

  const getNextElement = (idx: number): HTMLInputElement | null => {
    // if (idx === null) {
    //   console.log('tso');
    // }
    //if all questions are done and disabled, return null
    if (totalFinished > focusRefs.current.length - 2) {
      return null;
    }

    const nextItem = focusRefs.current[idx];

    //if we are at the last element in focus refs, go back to start
    if (nextItem === undefined) {
      return getNextElement(0);
    }

    //if the input is disabled, try focusing on the next one
    //this one seems to be the source of the infinite loop
    if (nextItem.disabled && isOn) {
      return getNextElement(idx + 1);
    }

    return nextItem;
  };

  const focusInput = (name: string) => {
    //find current element index
    const foundElIdx = focusRefs.current.findIndex((el: HTMLInputElement) => {
      return el.name === name;
    });

    //get next element
    const nextElement = getNextElement(foundElIdx + 1);

    //TS check
    if (nextElement === null) {
      return;
    }

    nextElement.focus();
  };

  useEffect(() => {
    if (isOn === true) {
      focusRefs.current[0].focus();
    }
  }, [isOn]);

  const colors = [
    { name: '', color: '' },
    { name: 'yellow', color: theme.yellow },
    { name: 'orange', color: theme.orange },
    { name: 'green', color: theme.green },
    { name: 'blue', color: theme.blue },
  ];
  let i = 0;
  const content = lvls.map((lvl) => {
    i++;
    return lvl.map((question) => {
      return (
        <QuestionBox
          lvl={colors[i].name}
          focusNext={(name: string) => focusInput(name)}
          refer={addToRefs}
          correct={null}
          disabled={false}
          key={`${question[0]}`}
          name={`${question[0]}`}
          color={colors[i].color}
          answers={question[1]}
        />
      );
    });
  });

  return <StContainer>{content}</StContainer>;
};

export default QuestionsSheet;
