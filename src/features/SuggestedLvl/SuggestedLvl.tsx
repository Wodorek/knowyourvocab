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

// export const suggestedLvls = {
//   500: 'A0',
//   1000: 'A1',
//   1500: 'A2 (powtórka żółty)',
//   2500: 'A2 (pomarańczowy)',
//   4000: 'B1(powtórka pomarańczowy)',
//   8000: 'B2',
// };

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
