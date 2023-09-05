const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
import cors from 'cors';
import mongoose from 'mongoose';
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
import { router as bookingsRouter } from './routes/bookings';
import { router as tablesRouter} from './routes/tables'

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bookings', bookingsRouter);
app.use('/tables', tablesRouter)

mongoose
  .connect(process.env.DB_URL!)
  .then(() => console.log('Connected to DB'));

app.listen('3000', () => {
  console.log('körs');
});

module.exports = app;