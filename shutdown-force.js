const moment = require("moment");
const { exec } = require("child_process");

const shutdownBash =
  "ps -ef | grep Pal | grep -v grep | awk '{print $2}' | xargs kill -9";

shutdown();



function shutdown() {
  exec(shutdownBash, (err, stdout, stderr) => {
    if (err) {
      console.error(
        `[${moment().format("HH:mm:ss")}] Error executing shutdown`
      );
      return;
    }

    console.log(
      `[${moment().format("HH:mm:ss")}] PalServer is already shutdown`
    );
  });
}
