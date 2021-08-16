const express = require("express");
require("dotenv").config();
const models = require("./models/models");
const app = express();
const sequelize = require("./db");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const router = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
