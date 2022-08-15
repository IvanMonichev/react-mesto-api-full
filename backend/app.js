const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT = 3000 } = process.env;

const router = require('./routes');
const serverError = require('./middlewares/serverError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
  origin: [
    'https://monichev.mesto.nomoredomains.sbs',
    'http://monichev.mesto.nomoredomains.sbs',
    'https://api.monichev.mesto.nomoredomains.sbs',
    'http://api.monichev.mesto.nomoredomains.sbs',
    'https://api.monichev.mesto.nomoredomains.sbs/users/me',
    'https://api.monichev.mesto.nomoredomains.sbs/cards',
    'http://localhost:3001'
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(serverError);

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен! Порт – ${PORT}.`);
});