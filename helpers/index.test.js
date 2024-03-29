const { sampleWonDataArray, sampleLoseDataArray } = require('../consts/index');
const { isValidGuess, hasWon, formatResponse } = require('./index');

test('isValidGuess works correctly', () => {
  expect(isValidGuess('train')).toBe(true);
  expect(isValidGuess('trai')).toBe(false);
  expect(isValidGuess('trainn')).toBe(false);
  expect(isValidGuess('trai3')).toBe(false);
});

test('hasWon works correctly', () => {
  expect(hasWon(sampleLoseDataArray)).toBe(false);
  expect(hasWon(sampleWonDataArray)).toBe(true);
});

test('formatResponse works correct', () => {
  expect(formatResponse(sampleLoseDataArray)).toStrictEqual([
    'H :black_square:',
    'E :black_square:',
    'L :large_orange_square:',
    'L :large_green_square:',
    'O :black_square:',
  ]);
});
