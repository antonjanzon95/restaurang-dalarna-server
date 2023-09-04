"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bookings_1 = require("./routes/bookings");
const tables_1 = require("./routes/tables");
const app = express();
app.use((0, cors_1.default)());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bookings', bookings_1.router);
app.use('/tables', tables_1.router);
mongoose_1.default
    .connect(process.env.DB_URL)
    .then(() => console.log('Connected to DB'));
app.listen('3000', () => {
    console.log('körs');
});
module.exports = app;
