/**
 * Contains all the logic of the hanoi towers riddle
 */

import _ from 'lodash';

/**
 * Returns true if the riddle is solved correctly
 * @param {*} state - Array of arrays representing current state of the towers
 */
const isSolved = (state) => {
  const nonemty = state.findIndex(x => x.length !== 0);
  if (nonemty < 1) {
    return false;
  }
  return state.every((tower, index) => {
    const len = tower.length;
    if (index !== nonemty) {
      return len === 0;
    }
    return _.isEqual(tower, _.rangeRight(1, len+1));
  });
};

/**
 * 
 * @param {*} state - Array of arrays representing the state of a game
 * @param {*} mv - Array of two elements, [from, to] representing a move to perform
 */
const move = (state, mv) => {
  const [prev, next] = mv;
  const len = state.length;
  if (!_.inRange(prev, len)   ||
      !_.inRange(next, len)   ||
      prev === next           ||
      _.isEmpty(state[prev])  ||
      (!_.isEmpty(state[next]) && _.last(state[prev]) > _.last(state[next]))
    ) {
        return state;
      }
  const nextState = [];
  state.forEach(tower => nextState.push([...tower]));
  nextState[next].push(nextState[prev].pop());
  return nextState;
};

const getInitialState = (plates=8, size=3) => {
  return [
    _.rangeRight(1, plates+1),
    ..._.times(size-1, _.stubArray)
  ];
};

export {
  isSolved,
  move,
  getInitialState,
};