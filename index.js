const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_DB_CONFIG } = require("./config/app.config");
const errors = require("./middleware/errors.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == 'OPTIONS') res.sendStatus(200); else next();
})
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_DB_CONFIG.DB)
  .then(() => {
    console.log('Connection Successful');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/uploads", express.static("uploads"));

// initialize routes
app.use("/api", require("./routes/app.routes"));

app.use(errors.errorHandler);

// listen for requests
app.listen(process.env.port || 4000, function () {
  console.log("Ready to Go!");
});