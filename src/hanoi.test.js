import * as hanoi from './hanoi'

describe('hanoi', () => {
  describe('isSolved', () => {
    const tests = [
      {
        state: [
          [], 
          [],
          [8, 7, 6, 5, 4, 3, 2, 1],
        ],
        want: true,
      },
      {
        state: [
          [],
          [8, 7, 6, 5, 4, 3, 2, 1], 
          [],
        ],
        want: true,
      },
      {
        state: [
          [8, 7, 6, 5, 4, 3, 2, 1],
          [], 
          [],
        ],
        want: false,
      },
      {
        state: [
          [8, 7, 6, 5, 4, 3],
          [], 
          [2, 1],
        ],
        want: false,
      },
    ];

    tests.forEach(test => {
      it(`isSolved ${JSON.stringify(test.state)} should return ${test.want}`, () => {
        const got = hanoi.isSolved(test.state);
        expect(got).toBe(test.want);
      });
    });
  });

  describe('move', () => {
    const tests = [
      {
        state: [[4, 3, 2, 1], [], []],
        mv: [0, 1],
        want: [[4, 3, 2], [1], []],
      },
      {
        state: [[4, 3, 2, 1], [], []],
        mv: [0, 0],
        want: [[4, 3, 2, 1], [], []],
      },
      {
        state: [[4, 3, 2], [1], []],
        mv: [0, 1],
        want: [[4, 3, 2], [1], []],
      },
      {
        state: [[4, 3], [1], [2]],
        mv: [1, 2],
        want: [[4, 3], [], [2, 1]],
      },
    ];

    tests.forEach(test => {
      it(`move ${JSON.stringify(test.state)} [${test.mv}] should result in ${JSON.stringify(test.want)}`, () => {
        const got = hanoi.move(test.state, test.mv);
        expect(got).toEqual(test.want);
      });
    });
  });

  describe('getInitialState', () => {
    const tests = [
      {
        plates: 4,
        size: 3,
        want: [[4, 3, 2, 1], [], []],
      },
      {
        plates: 8,
        size: 3,
        want: [[8, 7, 6, 5, 4, 3, 2, 1], [], []],
      },
    ];

    tests.forEach(test => {
      it(`getInitialState plates=${test.plates} size=${test.size} should result in ${JSON.stringify(test.want)}`, () => {
        const got = hanoi.getInitialState(test.plates, test.size);
        expect(got).toEqual(test.want);
      });
    });
  });
});
