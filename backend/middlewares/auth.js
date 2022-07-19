// const User = require('../models/user');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');

const { authErorr } = require('./errors');

module.exports.isAuthorized = (req, res, next) => {
  // const auth = req.headers.authorization;
  // if (!auth) {
  //   authErorr();
  // }
  // const token = auth.replace('Bearer ', '');
  const token = req.cookies.jwt;
  if (!token) {
    authErorr();
  }
  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'very_secret');
    req.user = payload;
    next();
  } catch (err) {
    authErorr();
  }
};
