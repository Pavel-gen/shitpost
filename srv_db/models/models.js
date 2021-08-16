const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
});
const Plan = sequelize.define("plan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  plan_name: {
    type: DataTypes.STRING,
  },
});
const Exe = sequelize.define("exe", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  exe_name: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
});

const Train = sequelize.define("train", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  train_name: {
    type: DataTypes.STRING,
  },
  sets: {
    type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)),
  },
});

User.hasMany(Plan);
Plan.belongsTo(User);

User.hasMany(Train);
Train.belongsTo(User);

Plan.hasMany(Train);
Train.belongsTo(Plan);

Plan.hasMany(Exe);
Exe.belongsTo(Plan);

module.exports = {
  User,
  Plan,
  Train,
  Exe,
};
