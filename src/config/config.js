require("dotenv").config();
const Joi = require("joi");

const envValidation = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "production", "test")
      .required(),
    DEBUG: Joi.bool().default(false),
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().default("localhost"),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    LOG_FOLDER: Joi.string().required(),
    LOG_FILE: Joi.string().required(),
    LOG_LEVEL: Joi.string().required(),
    BASE_URL: Joi.string().default("BASE_URL"),
    HUAWEI_BASE_URL: Joi.string().required(),
    HUAWEI_USERNAME: Joi.string().required(),
    HUAWEI_SYSTEM_CODE: Joi.string().required(),
    SMTP_USERNAME: Joi.string().required(),
    SMTP_PASSWORD: Joi.string().required(),
    SMTP_HOST: Joi.string().required(),
    SMTP_EMAIL: Joi.string().required(),
    SMTP_PORT: Joi.number().required(),
    SMTP_ENCRYPTION: Joi.string().required(),
    SMTP_PROTOCAL: Joi.string().required(),

    SUNGROW_BASE_URL: Joi.string().required(), // Sungrow Service Provider
    SUNGROW_ACCESS_KEY: Joi.string().required(),
    SUNGROW_SYSTEM_CODE: Joi.number().required(),
    SUNGROW_APP_KEY: Joi.string().required(),
    SUNGROW_USER_ACCOUNT: Joi.string().required(),
    SUNGROW_USER_PASSWORD: Joi.string().required(),
    SUNGROW_LANGUAGE: Joi.string().required(),

    SOLIS_BASE_URL: Joi.string().required(),
    SOLIS_KEY_ID: Joi.string().required(),
    SOLIS_KEY_SECRET: Joi.string().required(),
    SOLIS_SYSTEM_CODE: Joi.number().required(),

    WBS_BASE_URL: Joi.string().required(),
    WBS_USERNAME: Joi.string().required(),
    WBS_PASSWORD: Joi.string().required(),

    TEAM_CHANNEL_URL: Joi.string().optional(),
  })
  .unknown();

const { value: envVar, error } = envValidation
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

module.exports = {
  nodeEnv: envVar.NODE_ENV,
  debug: envVar.DEBUG,
  BASE_URL: envVar.BASE_URL,
  port: parseInt(envVar.PORT),
  db: {
    host: envVar.DB_HOST,
    user: envVar.DB_USER,
    password: envVar.DB_PASS,
    name: envVar.DB_NAME,
    port: parseInt(envVar.DB_PORT),
  },
  jwt: {
    secret: envVar.JWT_SECRET,
  },
  logConfig: {
    logFolder: envVar.LOG_FOLDER,
    logFile: envVar.LOG_FILE,
    logLevel: envVar.LOG_LEVEL,
  },

  smtp: {
    username: envVar.SMTP_USERNAME,
    password: envVar.SMTP_PASSWORD,
    host: envVar.SMTP_HOST,
    email: envVar.SMTP_EMAIL,
    port: envVar.SMTP_PORT,
    encryption: envVar.SMTP_ENCRYPTION,
    protocal: envVar.SMTP_PROTOCAL,
  },

  huwaei: {
    username: envVar.HUAWEI_USERNAME,
    systemCode: envVar.HUAWEI_SYSTEM_CODE,
    baseUrl: envVar.HUAWEI_BASE_URL,
  },

  sungrow: {
    baseUrl: envVar.SUNGROW_BASE_URL,
    accessKey: envVar.SUNGROW_ACCESS_KEY,
    systemCode: parseInt(envVar.SUNGROW_SYSTEM_CODE),
    appKey: envVar.SUNGROW_APP_KEY,
    userAccount: envVar.SUNGROW_USER_ACCOUNT,
    userPassword: envVar.SUNGROW_USER_PASSWORD,
    language: envVar.SUNGROW_LANGUAGE,
    apikey: envVar.API_KEY,
  },

  solis: {
    baseUrl: envVar.SOLIS_BASE_URL,
    keyId: envVar.SOLIS_KEY_ID,
    keySecret: envVar.SOLIS_KEY_SECRET,
    systemCode: parseInt(envVar.SOLIS_SYSTEM_CODE),
    appKey: envVar.SOLIS_APP_KEY,
    userAccount: envVar.SOLIS_USER_ACCOUNT,
    userPassword: envVar.SOLIS_USER_PASSWORD,
    language: envVar.SOLIS_LANGUAGE,
    solis_md5: envVar.SOLIS_MD5,
  },

  solarman: {
    baseUrl: envVar.SOLARMAN_BASE_URL,
    appId: envVar.SOLARMAN_APP_ID,
    appSecret: envVar.SOLARMAN_APP_SECRET,
    orgId: envVar.SOLARMAN_ORGID,
    email: envVar.SOLARMAN_EMAIL,
    password: envVar.SOLARMAN_PASSWORD,
  },

  wbs: {
    baseUrl: envVar.WBS_BASE_URL,
    username: envVar.WBS_USERNAME,
    password: envVar.WBS_PASSWORD,
  },

  teamchannelUrl: envVar.TEAM_CHANNEL_URL,
};
