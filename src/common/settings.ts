import { blueLvl } from './Lvls/blueLvl';
import { orangeLvl } from './Lvls/orangeLvl';
import { greenLvl } from './Lvls/greenLvl';
import { yellowLvl } from './Lvls/yellowLvl';

const allLvls = [blueLvl, orangeLvl, greenLvl, yellowLvl];

let totalQuestions = 0;
allLvls.forEach((lvl) => {
  totalQuestions += lvl.length;
});

export const settings = {
  //apparently, incorrect in a row is no loger required feature... hence this 'fix' to disable it
  incorrectInARow: 100,
  incorrectTotal: 20,
  totalQuestions: totalQuestions,
};
