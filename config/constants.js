var env = process.env.NODE_ENV || "development";
var config = require("./config.json")[env];

module.exports = {
  APP_NAME: "Application Name",
  HOST_NAME: config["host"],
  PORT: config["port"],
  LOG_DIR: config["log-dir"],
  DEFAULT_ERROR: "Something went wrong!",
  DEFAULT_FILE: config["default-file"],
};
