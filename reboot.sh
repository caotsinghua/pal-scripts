set -ex


node ./shutdown-force.js
node ./backup.js
node ./startgame.js