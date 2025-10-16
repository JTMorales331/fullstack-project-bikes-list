import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import mongoose from "mongoose"
import 'dotenv/config';

// all of our routes
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import eventsRouter from "./routes/events.js";
import bikesRouter from "./routes/bikes.js";


// establish connection to mongoDB

const connection = process.env.LOCAL_DB

mongoose.connect(connection)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => {
    console.log("Unable to connect to MongoDB: ", err)
  })

const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/bikes', bikesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app
