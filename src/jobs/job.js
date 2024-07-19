// const cron = require("node-cron");
// const moment = require("moment");

// const HuaweiService = require("../services/DataService/HuaweiService");
// const SungrowService = require("../services/DataService/SungrowService");
// const SolisService = require("../services/DataService/SolisService");
// const { solis } = require("../config/config");
// const AlarmService = require("../services/AlarmService/AlarmService");
// const { config } = require("../config");
// const { exec } = require("child_process");
// const fs = require("fs");
// const SolarmanService = require("../services/DataService/SolarmanService");
// // Sql Database
// const projectDir = process.cwd();
// const backupDir = projectDir + "/src/backup";
// const myCronJob = () => {
//   //********************* Huaweri Jobs **************************
//   const backupDatabase = () => {
//     const dbName = config.db.name;
//     const dbPass = config.db.password;
//     const dbHost = config.db.host;
//     const dbUser = config.db.user;
//     const dbPort = config.db.port;

//     const format = "sql"; // MySQL backup format
//     const date = new Date();

//     const backupFilePath = `${backupDir}/${dbName}.${format}`;

//     // Check if backup file exists
//     if (fs.existsSync(backupFilePath)) {
//       // Remove existing backup file
//       fs.unlinkSync(backupFilePath);
//     }

//     // Execute MySQL dump command
//     exec(
//       `mysqldump --user=${dbUser} --password="${dbPass}" --host=${dbHost} --port=${dbPort} ${dbName} > ${backupFilePath}`,
//       (error, stdout, stderr) => {
//         if (error) {
//           return console.error(`exec error: ${error}`);
//         }
//         if (stderr) {
//           return console.error(`stderr: ${stderr}`);
//         }
//         console.log(
//           `Created a backup of ${dbName} at ${date.toLocaleString()} successfully: ${backupFilePath}`
//         );
//       }
//     );
//   };

//   // Every 10 minutes   */10 * * * *      0,5-59/5 * * * *
//   cron.schedule("0,5-59/5 * * * *", async () => {
//     console.log(
//       `5 minutes job running => ${moment()
//         .startOf("minute")
//         .format("YYYY-MM-DD HH:mm:ss")}`
//     );

//     // **********Huawei Device Data**************
//     HuaweiService.addDeviceRealData();
//     HuaweiService.addStationRealData();
//     HuaweiService.addStationDayDataInRealTimeTable();

//     // *********** Solis***********
//     SolisService.addDeviceRealData();
//     SolisService.addEpmRealData();
//     SolisService.addStationRealData();
//     SolisService.addStationStatusAndTotalPower();

//     // // ******* */ Sungrow **********
//     SungrowService.addDeviceRealData();
//     SungrowService.addStationRealData();

//     //**********Solarman Real Time APIs ***********/

//     SolarmanService.addStationRealData();
//     SolarmanService.addDeviceRealData();
//   });
//   // Every 30 minutes    */30 * * * *

//   cron.schedule("*/32 * * * *", () => {
//     console.log(
//       `30 minutes job running => ${moment()
//         .startOf("minute")
//         .format("YYYY-MM-DD HH:mm:ss")}`
//     );
//     HuaweiService.addAlarmData();
//     SungrowService.addAlarmData();
//     SolisService.addAlarmData();
//     SolarmanService.addAlarmData();
//   });

//   // // job that runs every hour
//   // cron.schedule("0 * * * *", () => {
//   //   console.log(
//   //     `30 minutes job running => ${moment()
//   //       .startOf("minute")
//   //       .format("YYYY-MM-DD HH:mm:ss")}`
//   //   );
//   //   SolisService.addStationHourlyData();
//   // });

//   // Job Every 2 hour
//   cron.schedule("0 */2 * * *", () => {
//     console.log(
//       `2 hours job running => ${moment()
//         .startOf("minute")
//         .format("YYYY-MM-DD HH:mm:ss")}`
//     );
//     AlarmService.getTicketsFromWBS();
//   });
//   // Run job daily    0 0 * * *
//   cron.schedule("0 0 * * *", () => {
//     console.log(
//       `Once a day at 12am => ${moment()
//         .startOf("minute")
//         .format("YYYY-MM-DD HH:mm:ss")}`
//     );
//     backupDatabase();
//     //archive jobs
//     SolisService.archiveDeviceData();
//     SolisService.archivePowerSensorData();
//     SolisService.archiveStationDayData();

//     SungrowService.addDevicesDayData();
//     SungrowService.addStationDayData(3);

//     ///Huwai
//     HuaweiService.addStationDayData();
//     HuaweiService.addDeviceDayData();

//     //monthly jobs that run daily

//     //sungrow

//     SungrowService.addStationMonthData();

//     // solis shift these to 11:55
//     SolisService.addDeviceMonthData();
//     SolisService.addStationMonthData();

//     //huwai
//     HuaweiService.addStationMonthData();
//     HuaweiService.addDeviceMonthData();

//     //Solarman

//     SolarmanService.addStationDayData();
//     SolarmanService.addDeviceDayData();
//   });

//   // Run job daily 11 55 pm
//   cron.schedule("55 23 * * *", () => {
//     console.log(
//       `Once a day at 11 55 pm => ${moment()
//         .startOf("minute")
//         .format("YYYY-MM-DD HH:mm:ss")}`
//     );

//     ///solis
//     SolisService.addStationDayData(3);
//     SolisService.addDeviceDayData(3);

//     //solis shift these to 11:55
//     SolisService.addDeviceMonthData();
//     SolisService.addStationMonthData();
//   });

//   cron.schedule("0 0 1 * *", () => {
//     console.log(
//       `At the start of every month => ${moment()
//         .startOf("month")
//         .format("YYYY-MM-DD HH:mm:ss")}`
//     );

//     //sungrow
//     SungrowService.addDevicesMonthlyData();
//     SungrowService.addStationMonthData();

//     //solis shift these to 11:55
//     SolisService.addDeviceMonthData();
//     SolisService.addStationMonthData();
//     // //huwai
//     HuaweiService.addStationMonthData();
//     HuaweiService.addDeviceMonthData();

//     // Solarman

//     SolarmanService.addStationMonthData();
//     SolarmanService.addDeviceMonthData();
//   });

//   //run yearly job
//   cron.schedule("0 0 1 1 *", () => {
//     console.log(
//       `Once a year on January 1st => ${moment()
//         .startOf("minute")
//         .format("YYYY-MM-DD HH:mm:ss")}`
//     );
//     //sungrow
//     SungrowService.addDevicesYearlyData();
//     SungrowService.addStationYearData();
//     //huwai
//     HuaweiService.addStationYearData();
//     HuaweiService.addDeviceYearData();

//     //solis
//     SolisService.addStationYearData();
//   });
// };

// module.exports = myCronJob;
