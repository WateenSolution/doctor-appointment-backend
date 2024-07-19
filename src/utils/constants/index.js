const displayMonthFormat = "MMM-YYYY";
const displayDateFormat = "DD-MMM-YYYY";

const dataTypes = {
  HOURLY: "hourly",
  DAILY: "daily",
  MONTHLY: "monthly",
  YEARLY: "yearly",
};

const filterTypes = {
  DAILY: "hourly",
  MONTHLY: "daily",
  YEARLY: "monthly",
};
const realHealthStates = {
  DISCONNECTED: "disconnected",
  FAULTY: "faulty",
  HEALTHY: "healthy",
};

const stationCategories = {
  PLATINUM: "Platinum",
  GOLD: "Gold",
  Silver: "Silver",
};

const alarmLevels = {
  CRITICAL: "Critical",
  MAJOR: "Major",
  MINOR: "Minor",
};

const alarmStatus = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

const onBoardingStationStatus = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

//Live Emails
const onboardingEmailAddress = {
  INSTALLER: [
    "dawood.Ahmed@wateen.com",
    "haseeb.Nawaz@wateen.com",
    "hasan.Akhtar@wateen.com",
    "muhammad.Safdar@wateen.com",
  ],
  OPS_MANAGER: ["muhammad.Mohsin@wateen.com", "umerfareed.wateen@gmail.com"],
  ADMIN: [
    "asad.munir@wateen.com",
    "mianumerfareed72@gmail.com",
    "ch.faheem5183@gmail.com",
  ],
};

const deviceTypes = {
  INVERTER: "INVERTER",
  GRID_METER: "GRID_METER",
};

const appEnvironments = Object.freeze({
  LOCAL: "local",
  DEVELOPMENT: "development",
  STAGING: "staging",
  PRODUCTION: "production",
});

const sungrowReultCodes = Object.freeze({
  SUCCESS: "1",
});

const sungrowStationsConversions = [
  1296191, 1243343, 1313403, 1312256, 1320189, 1317040, 1321862,
];

const passwordMessage =
  "Password must be at least 8 characters with uppercase, lowercase, number, and special character.";
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

module.exports = {
  passwordRegExp,
  passwordMessage,
  displayMonthFormat,
  displayDateFormat,
  dataTypes,
  realHealthStates,
  alarmLevels,
  stationCategories,
  onBoardingStationStatus,
  alarmStatus,
  onboardingEmailAddress,
  deviceTypes,
  appEnvironments,
  sungrowReultCodes,
  sungrowStationsConversions,
};
