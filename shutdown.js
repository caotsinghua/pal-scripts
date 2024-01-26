const config = require("./config");
const { Rcon } = require("rcon-client");
const moment = require('moment')

const rcon = new Rcon({
  host: config.rconServerHost,
  port: config.rconServerPort,
  password: config.rconPassword,
});

sendMsgandReboot()

export async function sendMsgandReboot() {
  try {
    await rcon.connect();
    console.log(`[${moment().format("HH:mm:ss")}] Connected to the server!`);
    await rcon.send(
      `Shutdown ${rebootSecond} The_server_will_restart_in_${rebootSecond}_seconds.`
    );
    console.log(
      `[${moment().format("HH:mm:ss")}] Command sent, not waiting for response`
    );
  } catch (error) {
    console.error(
      `[${moment().format("HH:mm:ss")}] Error sending RCON command:`,
      error
    );
  } finally {
    rcon.end();
  }
}
