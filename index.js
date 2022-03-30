require("dotenv").config({ path: __dirname + "/.env" });

const { App } = require("@slack/bolt");
const axios = require("axios");

const { isValidGuess, hasWon, formatResponse } = require("./helpers/index");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

let tries = 1;
let streak = 0;
let canPlayToday = true;

function newDayInit() {
  d = new Date();

  if (d.getHours() === 12) {
    canPlayToday = true;
  }
}

setInterval(newDayInit, 6000);

app.message("hello", async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
});

app.command("/guess", async ({ command, ack, say }) => {
  await ack();

  if (isValidGuess(command.text)) {
    try {
      const guessData = await axios
        .get(`https://v1.wordle.k2bd.dev/daily?guess=${command.text}`)
        .then((response) => response.data);

      if (tries > 7) {
        canPlayToday = false;
        streak = 0;

        return await say(
          "You have failed on getting the correct word today and have lost the streak. Good luck tomorrow."
        );
      }

      if (!canPlayToday) {
        return await say(
          "You have already completed today's game. Come back tomorrow for a new word!"
        );
      }

      const botResponse = formatResponse(guessData);

      if (hasWon(guessData)) {
        const currentTries = tries;
        tries = 0;
        canPlayToday = false;
        streak += 1;

        return say(
          `${botResponse.join("\n")}\n<@${
            command.user_name
          }> has got it right! Today's wordle was ${
            command.text
          }.\nTook a total of ${currentTries} ${
            currentTries === 1 ? "try" : "tries"
          }.\nCurrent streak: ${streak}`
        );
      }

      tries += 1;
      await say(`<@${command.user_name}>:\n${botResponse.join("\n")}`);
    } catch (err) {
      console.log(err);
    }
  } else {
    await say(
      `<@${command.user_name}>, your guess format is incorrect. It must have 5 letters.`
    );
  }
});

(async () => {
  await app.start();

  console.log("Wordle Bot is Running!!");
})();
