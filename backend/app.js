const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { login, creatUser } = require('./controllers/user');
const { isAuthorized } = require('./middlewares/auth');
const { notFoundPageErorr } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { isCorse } = require('./middlewares/cors');

mongoose.connect('mongodb://localhost:27017/mestodb');

const allowedCors = [
  'localhost:3000',
  'https://project-mesto72.nomoredomains.xyz',
  'http://project-mesto72.nomoredomains.xyz',
  'http://api.project-mesto72.nomoredomains.xyz',
  'https://api.project-mesto72.nomoredomains.xyz',
];

const PORT = 3000;
const app = express();
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
// app.use(isCorse);
app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(http|https):\/\/([\w.]+\/?)\S*/),
    password: Joi.string().required().min(8),
  }),
}), creatUser);

app.use(isAuthorized);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(notFoundPageErorr());
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({ message: 'что-то пошло не так' });
});

app.listen(PORT, () => {});
