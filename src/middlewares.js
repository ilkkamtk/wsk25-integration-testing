import {validationResult} from 'express-validator';
import CustomError from './classes/CustomError.js';

const notFound = (req, res, next) => {
  const error = new CustomError(`🔍 - Not Found - ${req.originalUrl}`, 404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

const getStudents = async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/students');
    const students = await response.json();
    console.log('getStudents', students);
    res.locals.students = students;
    next();
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((error) => `${error.msg}: ${error.path}`)
      .join(', ');
    next(new CustomError(messages, 400));
    return;
  }
  next();
};

export {notFound, errorHandler, getStudents, validate};
