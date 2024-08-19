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

module.exports = {
  getCurrentTime,

  convertUnixTime,

  sendEmail,

  dateTimeFormatInPK,
  convertMillisToTimestamp,
  responseMessage,
  toYearData,
};
