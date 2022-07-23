const express = require("express");
const UserRouter = require("./user/userrouter");

const app = express();

app.use(express.json());

app.use(UserRouter);

module.exports = app;