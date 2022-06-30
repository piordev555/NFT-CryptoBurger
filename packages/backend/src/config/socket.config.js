const dotenv = require("dotenv").config({ path: "../../.env" }).parsed;

let socketPort;
if (process.env.ENVIRONMENT === "development") {
  socketPort = dotenv.SOCKET_PORT_DEVELOPMENT;
} else if (process.env.ENVIRONMENT === "production") {
  socketPort = dotenv.SOCKET_PORT;
}

module.exports = {
  SOCKET_PORT: socketPort,
};
