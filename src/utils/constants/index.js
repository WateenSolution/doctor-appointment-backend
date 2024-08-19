const displayMonthFormat = "MMM-YYYY";
const displayDateFormat = "DD-MMM-YYYY";

const stationCategories = {
  PLATINUM: "Platinum",
  GOLD: "Gold",
  Silver: "Silver",
};

const alarmStatus = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

const appEnvironments = Object.freeze({
  LOCAL: "local",
  DEVELOPMENT: "development",
  STAGING: "staging",
  PRODUCTION: "production",
});

const passwordMessage =
  "Password must be at least 8 characters with uppercase, lowercase, number, and special character.";
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

module.exports = {
  passwordRegExp,
  passwordMessage,
  displayMonthFormat,
  displayDateFormat,
  stationCategories,
  alarmStatus,
  appEnvironments,
};
