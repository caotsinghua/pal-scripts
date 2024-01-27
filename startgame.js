const { exec ,spawn} = require("child_process");
const config = require("./config");
const moment = require('moment')

// 必须在没有服务的情况下运行
exec(`ps -ef | grep Pal`, (err, stdout, stderr) => {
  if (err) {
    console.error(
      `[${moment().format("HH:mm:ss")}] Error executing tasklist: ${err}`
    );
    return;
  }

  if (stdout.toLowerCase().indexOf("palserver") === -1) {
    console.log(
      `[${moment().format(
        "HH:mm:ss"
      )}] palserver is not running. Attempting to start.`
    );
    startProcess();
  } else {
    console.log(
      `[${moment().format(
        "HH:mm:ss"
      )}] PalServer is already running.start failed`
    );
  }
});

function startProcess() {
  console.log(startCMD) 
  const startSpawn = spawn('nohup',[config.palServerPath , '&'])
  startSpawn.on('close',()=>{
    console.log('start spawn 退出')
  })
  startSpawn.stdout.on('data',(data)=>{
    console.log("[start pal]"+data)
  })


  // exec(startCMD, (err, stdout, stderr) => {
  //   if (err) {
  //     console.error(
  //       `[${moment().format("HH:mm:ss")}] Error starting process: ${err}`
  //     );
  //     return;
  //   }
  //   if (stderr) {
  //     console.error(
  //       `[${moment().format("HH:mm:ss")}] Standard error output: ${stderr}`
  //     );
  //   }
  //   console.log(`[${moment().format("HH:mm:ss")}] Process started: ${stdout}`);
  // });
}
