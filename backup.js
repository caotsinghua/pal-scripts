const path = require("path");
const fsExtra = require("fs-extra");
const moment = require("moment");
const archiver = require("archiver");
const config = require("./config");
const fs = require('fs')

main();

function main() {
  const { gamedataPath, backupPath } = config;
  backupDirectory(gamedataPath, backupPath);
}

async function backupDirectory(sourceDir, backupDir) {
  try {
    const hasSource = await fsExtra.pathExists(sourceDir)
    if(!hasSource){
      throw Error("无存档数据")
    }
    // 创建临时目录路径
    const tempDir = path.join(backupDir, "temp");

    // 确保临时目录存在或创建它
    await fsExtra.ensureDir(tempDir);

    // 清空临时目录
    await fsExtra.emptyDir(tempDir);

    // 复制文件到临时目录
    await fsExtra.copy(sourceDir, tempDir);

    // 创建压缩文件的名称
    const zipFileName = `backup-${moment().format("YYYYMMDD-HHmm")}.zip`;
    const output = fs.createWriteStream(path.join(backupDir, zipFileName));
    const archive = archiver("zip", {
      zlib: { level: 9 }, // 设置压缩级别
    });

    output.on("close", function () {
      console.log(
        `[${moment().format(
          "HH:mm:ss"
        )}] Backup of '${sourceDir}' has been saved as '${zipFileName}'`
      );
    });

    archive.on("error", function (err) {
      throw err;
    });

    archive.pipe(output);
    archive.directory(tempDir, false);
    archive.finalize();
  } catch (error) {
    console.error(
      `[${moment().format("HH:mm:ss")}] Error during backup: `,
      error
    );
  }
}
