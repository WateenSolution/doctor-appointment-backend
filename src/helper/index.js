const { config } = require("../config");

const moment = require("moment");
const axios = require("axios");
const nodemailer = require("nodemailer");
const { logger } = require("../config");
const { appEnvironments } = require("../utils/constants");

//helper function to get currentTime
const getCurrentTime = () => {
  const currentTimestamp = moment()
    .startOf("minute")
    .format("YYYY-MM-DD HH:mm:ss");
  return currentTimestamp;
};

const getPrevMonthTimeStamp = () => {
  const currentTimestamp = moment()
    .startOf("minute")
    .subtract(1, "months")
    .format("YYYY-MM-DD HH:mm:ss");
  return currentTimestamp;
};

const convertToTimeStamp = (date) => {
  const parsedDate = moment(date, "YYYYMM"); // Parse input date with the correct format
  const formattedDate = parsedDate.format("YYYY-MM-DD HH:mm:ss");
  return formattedDate;
};
const dateConverter = (val) => {
  const today = moment().endOf("day");
  let currentDate = moment(val);

  // var diff = today.diff(currentDate, "days");

  // if (diff === 0) return "Today";
  // if (diff == 1) return "Yesterday";
  return moment(val).format("DD-MMM-YYYY");
};

const convertUnixTime = (unixTime, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!unixTime) return null;

  const timestamp = moment(unixTime).format(format);

  return timestamp;
};

const sendEmail = async (to_email, subject, body = "", html) => {
  let transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.smtp.username,
      pass: config.smtp.password,
    },
  });

  // let info = await transporter.sendMail({
  //   from: config.smtp.email,
  //   to: to_email, // list of receivers
  //   subject: subject, // Subject line
  //   text: body, // plain text body
  // });

  // let transporter = nodemailer.createTransport({
  //   service: "gmail", // true for 465, false for other ports
  //   secure: true,
  //   auth: {
  //     user: "wateensolution@gmail.com", // generated ethereal user
  //     pass: "naiuygtakfqfwczr", // generated ethereal password
  //   },
  // });

  const mesage = {
    from: `Wateen Solution <${config.smtp.email}>`, // sender address
    to: to_email, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
    html: html,
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mesage);
  return info;
};

const convertTimestampToUnix = (datetimeString) => {
  const unixTime = moment(datetimeString).unix();

  return unixTime;
};

const huwaeiStationState = (real_health_state) => {
  switch (real_health_state) {
    case 1:
      return "disconnected";
    case 2:
      return "faulty";
    case 3:
      return "healthy";
    default:
      return "";
  }
};

const solisStationState = (real_health_state) => {
  switch (real_health_state) {
    case 2:
      return "disconnected";
    case 3:
      return "faulty";
    case 1:
      return "healthy";
    default:
      return "";
  }
};
const huwaeiAlarmLevel = (level) => {
  switch (level) {
    case 1:
      return "Critical";
    case 2:
      return "Major";
    case 3:
      return "Minor";
    case 4:
      return "Warning";
    default:
      return "";
  }
};

// sendSlackMessage("hello", {
//   id: 1,
//   text: 1,
// });

// Function to send error message to Slack channel
const sendSlackMessage = async (message = "", data = {}) => {
  const slackWebhookURL =
    "https://hooks.slack.com/services/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";

  try {
    const payload = {
      // text: JSON.stringify(data),
      // data1: JSON.stringify(data),

      text: "Test",
      customer_who_is_trying: "customer_id,",
      duplicate_customer: "customer_card.customer_duplicate_acount",
      payload: null,
    };

    // Post the error message to Slack
    await axios.post(slackWebhookURL, payload);
  } catch (err) {
    console.error("Failed to send error message to Slack:", err);
  }
};

const todayData = (data, is_complete_interval = true) => {
  const currentDate = moment().format("YYYY-MM-DD");

  const records = [];
  let currentTime = moment(currentDate).startOf("day");

  data.forEach((row) => {
    const recordTime = moment(row.time, "HH:mm:ss");

    // Add missing time intervals before each record
    while (currentTime.isBefore(recordTime)) {
      records.push({
        time: currentTime.format("HH:mm:ss"),
      });
      currentTime = currentTime.add(5, "minutes");
    }

    records.push(row);
    currentTime = currentTime.add(5, "minutes");
  });

  // Add missing time intervals after the last record until the end of the day
  if (is_complete_interval) {
    while (
      currentTime.isBefore(moment(currentDate).endOf("day")) ||
      currentTime.isSame(moment(currentDate).endOf("day"))
    ) {
      records.push({
        time: currentTime.format("HH:mm:ss"),
      });
      currentTime = currentTime.add(5, "minutes");
    }
  }
  return records;
};

const toMonthData = (data, is_complete_interval = true) => {
  const currentDate = moment().format("YYYY-MM-01"); // Start of the current month

  const records = [];
  let currentDay = moment(currentDate).startOf("day");

  data.forEach((row) => {
    const recordDay = moment(row.time, "YYYY-MM-DD");

    // Add missing day intervals before each record
    while (currentDay.isBefore(recordDay, "day")) {
      records.push({
        time: currentDay.format("YYYY-MM-DD"),
      });
      currentDay = currentDay.add(1, "day");
    }

    records.push(row);
    currentDay = currentDay.add(1, "day");
  });

  // Add missing day intervals after the last record until the end of the month
  if (is_complete_interval) {
    while (
      currentDay.isBefore(moment(currentDate).endOf("month"), "day") ||
      currentDay.isSame(moment(currentDate).endOf("month"), "day")
    ) {
      records.push({
        time: currentDay.format("YYYY-MM-DD"),
      });
      currentDay = currentDay.add(1, "day");
    }
  }
  return records;
};

const toYearData = (data, is_complete_interval = true) => {
  const currentYear = moment().format("YYYY-01-01"); // Start of the current year

  const records = [];
  let currentMonth = moment(currentYear).startOf("month");

  data.forEach((row) => {
    const recordMonth = moment(row.time, "YYYY-MM");

    // Add missing month intervals before each record
    while (currentMonth.isBefore(recordMonth, "month")) {
      records.push({
        time: currentMonth.format("MMM"),
      });
      currentMonth = currentMonth.add(1, "month");
    }

    records.push({
      ...row,
      time: moment(row.time).format("MMM"),
    });
    currentMonth = currentMonth.add(1, "month");
  });

  // Add missing month intervals after the last record until the end of the year
  if (is_complete_interval) {
    while (
      currentMonth.isBefore(moment(currentYear).endOf("year"), "month") ||
      currentMonth.isSame(moment(currentYear).endOf("year"), "month")
    ) {
      records.push({
        time: currentMonth.format("MMM"),
      });
      currentMonth = currentMonth.add(1, "month");
    }
  }
  return records;
};

const toYearDataRevenue = (data) => {
  const currentYear = moment().format("YYYY-01-01"); // Start of the current year

  const records = [];
  let currentMonth = moment(currentYear).startOf("month");

  data.forEach((row) => {
    const recordMonth = moment(row.month_year, "YYYY-MM");

    // Add missing month intervals before each record
    while (currentMonth.isBefore(recordMonth, "month")) {
      records.push({
        month_year: currentMonth.format("MMM"),
      });
      currentMonth = currentMonth.add(1, "month");
    }

    records.push({
      ...row,
      month_year: moment(row.month_year).format("MMM"),
    });
    currentMonth = currentMonth.add(1, "month");
  });

  // Add missing month intervals after the last record until the end of the year
  while (
    currentMonth.isBefore(moment(currentYear).endOf("year"), "month") ||
    currentMonth.isSame(moment(currentYear).endOf("year"), "month")
  ) {
    records.push({
      month_year: currentMonth.format("MMM"),
    });
    currentMonth = currentMonth.add(1, "month");
  }

  return records;
};

const solisAlarmLevel = (level) => {
  switch (level) {
    case "3":
      return "Critical";
    case "2":
      return "Major";
    case "1":
      return "Minor";
    default:
      return null;
  }
};

const solarmanAlarmLevel = (level) => {
  switch (level) {
    case 2:
      return "Critical";
    case 1:
      return "Major";
    case 0:
      return "Minor";
    default:
      return null;
  }
};
const solisAlarmState = (state) => {
  switch (state) {
    case "Solved":
      return "Active";
    case "Pending":
      return "Inactive";
    // 3rd case Recover
    default:
      return "";
  }
};

const dateTimeFormatInPK = (date) => {
  // GMT Time to PK
  return moment(date).add(5, "hours").format("YYYY-MM-DD : HH:mm:ss");
};

const convertMillisToTimestamp = async (milliseconds) => {
  const timestamp = moment(milliseconds).format("YYYY-MM-DD HH:mm:ss");
  return timestamp;
};

const responseMessage = (error) => {
  logger.error(error);

  let message = "Something went wrong";

  if (config.debug && typeof error?.message === "string") {
    message = error?.message;
  }

  if (config.nodeEnv !== appEnvironments.LOCAL) {
    sendTeamMessage(error);
  }

  return message;
};

const solarToGrid = (provider, gridValue) => {
  if (provider == "Sungrow") {
    if (gridValue < 0) {
      return true;
    }
  } else {
    if (gridValue > 0) {
      return true;
    }
  }

  return false;
};

const gridToHome = (provider, gridValue) => {
  if (provider == "Sungrow") {
    if (gridValue > 0) {
      return true;
    }
  } else {
    if (gridValue < 0) {
      return true;
    }
  }

  return false;
};

const yearToTimeStamp = (year) => {
  // Create a Date object for January 1st of the specified year at 00:00:00 hours
  let date = new Date(year, 0, 1, 0, 0, 0);

  // Get the timestamp in milliseconds since the Unix Epoch
  let timestampMillis = date.getTime();
  return timestampMillis;
};

const sendTeamMessage = async (error) => {
  try {
    const teamsWebhookUrl = config.teamchannelUrl;

    // If channel url exists then send url
    if (teamsWebhookUrl) {
      const payload = {
        "@type": "MessageCard",
        "@context": "http://schema.org/extensions",
        summary: "Server Error Notification",
        themeColor: "FF5733",
        sections: [
          {
            // activityTitle: "Server Error Notification",
            // activitySubtitle: `Timestamp: `,
            activityImage: "https://example.com/error-image.png",
            facts: [
              {
                name: "Message",
                value: `**${
                  error?.message || "No error message provided"
                }**\n\n\`\`\`${
                  error?.stack || "No stack trace provided"
                }\`\`\``,
              },
              // {
              //   name: "Stack Trace",
              //   value: "```" + error?.stack + "```" || "",
              // },
              // Add more facts as needed
            ],
            markdown: true,
          },
        ],
      };

      const res = axios.post(teamsWebhookUrl, payload);
    }
  } catch (err) {
    logger("Team Exception");
  }
};

const calculateExpectedValue = async (
  monthExpectedValue,
  daysInMonth,
  data_type
) => {
  let expectedValue = null;
  switch (data_type) {
    case "day":
      expectedValue = +(monthExpectedValue / daysInMonth / 12).toFixed(2);
      break;
    case "month":
      expectedValue = +(monthExpectedValue / daysInMonth).toFixed(2);
      break;
    case "year":
      expectedValue = monthExpectedValue;
      break;
  }

  return expectedValue;
};

const convertSungrowTimeStampToTimeStamp = async (dateStr) => {
  // Parse the year and month from the given date string
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);

  // Create a new Date object with the parsed year and month
  const date = new Date(`${year}-${month}-1 12:00:00`);

  // Format the date into the desired format "YYYY-MM-DD HH:mm:ss"
  const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");

  return formattedDate;
};

const providerToId = (provider) => {
  switch (provider) {
    case "Huawei":
      return 1;
    case "Solis":
      return 2;
    case "Sungrow":
      return 3;
  }
};
const convertValueToKWh = (energy) => {
  switch (energy.unit) {
    case "MWh":
      return energy?.value * 1000;
    case "kWh":
      return energy?.value;
  }
};

// calculate distance between station and user by using haversine
const calculateDistance = (lat1, lon1, lat2, lon2, unit = "km") => {
  const unitValue = unit == "km" ? 1 : 1000;
  const R = 6371 * unitValue; // Radius of the Earth in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // Distance in meters
};

const getObjectByKey = async (dataList, key) => {
  return dataList.find((item) => item.key === key);
};

const sha256Hash = async (str) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

module.exports = {
  getCurrentTime,
  dateConverter,
  convertUnixTime,
  convertTimestampToUnix,
  huwaeiStationState,
  sendSlackMessage,
  huwaeiAlarmLevel,
  todayData,
  sendEmail,
  solisAlarmLevel,
  solisAlarmState,
  solisStationState,
  dateTimeFormatInPK,
  convertMillisToTimestamp,
  responseMessage,
  getPrevMonthTimeStamp,
  solarToGrid,
  gridToHome,
  yearToTimeStamp,
  calculateExpectedValue,
  toMonthData,
  calculateDistance,
  toYearData,
  toYearDataRevenue,
  convertToTimeStamp,
  convertSungrowTimeStampToTimeStamp,
  providerToId,
  convertValueToKWh,
  getObjectByKey,
  solarmanAlarmLevel,
  sha256Hash,
};
