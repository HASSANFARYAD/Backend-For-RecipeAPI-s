// IpCollector.js

const fs = require("fs");
const path = require("path");

// Middleware to log IP address, date, and time
const ipCollectorMiddleware = (req, res, next) => {
  const ipAddress = req.ip || req.connection.remoteAddress;
  const timestamp = new Date().toISOString();

  const logData = {
    ip: ipAddress,
    timestamp: timestamp,
  };

  const logFilePath = path.join(__dirname, "ip_logs.json");
  console.log(logFilePath);
  // Read existing logs
  let existingLogs = [];
  try {
    const data = fs.readFileSync(logFilePath, "utf8");
    existingLogs = JSON.parse(data);
  } catch (err) {
    console.error("Error reading log file:", err.message);
  }

  // Add current log
  existingLogs.push(logData);

  // Write updated logs back to the file
  try {
    fs.writeFileSync(logFilePath, JSON.stringify(existingLogs, null, 2));
  } catch (err) {
    console.error("Error writing to log file:", err.message);
  }

  next();
};

module.exports = ipCollectorMiddleware;
