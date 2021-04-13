import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

interface IProps {
  color: string;
}

const InformationBox: React.FC<IProps> = (props) => {
  const totals = useSelector(
    (state: RootStateOrAny) => state.answers.totals[props.color]
  ).toFixed(0);

  const percentage = useSelector(
    (state: RootStateOrAny) => state.answers.percentage[props.color]
  ).toFixed(0);

  return (
    <div>
      <p>
        {totals} słówek z poziomu {props.color}
      </p>
      <p>{percentage} %</p>
    </div>
  );
};

export default InformationBox;
