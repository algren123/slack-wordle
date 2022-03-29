function assignSquare(result) {
  switch (result) {
    case 'absent':
      return ':black_square:';
    case 'present':
      return ':large_orange_square:';
    case 'correct':
      return ':large_green_square:';
  }
}

module.exports = {
  isValidGuess: function (guess) {
    if (guess.length !== 5 || !/^[a-zA-Z]+$/.test(guess)) {
      return false;
    }

    return true;
  },
  hasWon: function (guessDataArray) {
    const resultArray = [];
    guessDataArray.forEach((dataEntry) => {
      resultArray.push(dataEntry.result);
    });

    return resultArray[0] === 'correct' && new Set(resultArray).size === 1;
  },
  formatResponse: function (guessData) {
    return guessData.map((dataEntry) => {
      return `${dataEntry.guess.toUpperCase()} ${assignSquare(
        dataEntry.result
      )}`;
    });
  },
};
