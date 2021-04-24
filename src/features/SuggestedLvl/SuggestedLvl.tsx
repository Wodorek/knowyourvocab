import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import { suggestedLvls } from '../../common/Lvls/suggestedLvls';

const StContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SuggestedLvl = () => {
  const [suggested, setSuggested] = useState('');

  const totalWords = useSelector(
    (state: RootStateOrAny) => state.answers.totals.total
  );

  useEffect(() => {
    let suggested = '';
    const selectSuggestedLvl = () => {
      const key = Object.keys(suggestedLvls).find((key) => {
        return key > totalWords;
      });

      const idx = (key as unknown) as keyof typeof suggestedLvls;

      suggested = suggestedLvls[idx];
    };
    selectSuggestedLvl();

    setSuggested(suggested);
  }, [totalWords]);

  return (
    <StContainer>
      <p>razem słówek: {totalWords.toFixed(0)}</p>

      <p>sugerowany poziom: {suggested}</p>
    </StContainer>
  );
};

export default SuggestedLvl;
