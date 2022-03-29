const sampleWonDataArray = [
  {
    slot: 0,
    guess: 'h',
    result: 'correct',
  },
  {
    slot: 1,
    guess: 'e',
    result: 'correct',
  },
  {
    slot: 2,
    guess: 'l',
    result: 'correct',
  },
  {
    slot: 3,
    guess: 'l',
    result: 'correct',
  },
  {
    slot: 4,
    guess: 'o',
    result: 'correct',
  },
];

const sampleLoseDataArray = [
  {
    slot: 0,
    guess: 'h',
    result: 'absent',
  },
  {
    slot: 1,
    guess: 'e',
    result: 'absent',
  },
  {
    slot: 2,
    guess: 'l',
    result: 'present',
  },
  {
    slot: 3,
    guess: 'l',
    result: 'correct',
  },
  {
    slot: 4,
    guess: 'o',
    result: 'absent',
  },
];

module.exports = {
  sampleLoseDataArray,
  sampleWonDataArray,
};
