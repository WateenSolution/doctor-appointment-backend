const express = require("express");
const bodyParser = require("body-parser");
const httpStatus = require("http-status");
const cors = require("cors");
const http = require("http");

const path = require("path");
const { Server } = require("socket.io");

const responseHandler = require("./src/helper/responseHandler");
const routes = require("./src/routes");
const { config } = require("./src/config");
const myCronJob = require("./src/jobs/job");
const { appEnvironments } = require("./src/utils");

// Run the cron job
if (config.nodeEnv !== appEnvironments.LOCAL) {
  myCronJob();
}

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

// Show Default route
app.get("/", (req, res, next) => {
  return res.status(200).json({ message: "Server Connected Successfully" });
});

app.use("/api", routes);

app.use((req, res) => {
  const errorResponse = responseHandler.returnError(
    httpStatus.NOT_FOUND,
    `Network error`
  );
  return res.status(errorResponse?.statusCode).send(errorResponse?.response);
});

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log("listening on ", PORT);
});
