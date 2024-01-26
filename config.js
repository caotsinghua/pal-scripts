const path = require("path");
module.exports = {
  gamedataPath:
    "/home/steam/Steam/steamapps/common/PalServer/Pal/Saved/SaveGames", // 存档目录
  // path.resolve(__dirname,'./savegame'),
  backupPath: "/home/steam/pal-backups",
  backupInterval: 5 * 60 * 60 * 1000, // 5h 存档周期
  palServerPath: "/home/steam/Steam/steamapps/common/PalServer/PalServer.sh", // 服务启动路径
  palStartArgs: "-useperfthreads -NoAsyncLoadingThread -UseMultithreadForDS", // 启动参数

  //   rcon
  rconServerHost: "127.0.0.1",
  rconServerPort: 25575,
  rconPassword: "admin",
};
