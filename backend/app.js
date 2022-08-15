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


app.use(function(req, res, next) {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];
  const allowedCors = [
    'https://monichev.mesto.nomoredomains.sbs',
    'http://monichev.mesto.nomoredomains.sbs',
    'https://api.monichev.mesto.nomoredomains.sbs',
    'http://api.monichev.mesto.nomoredomains.sbs',
    'http://localhost:3001'
  ];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);

    if (method === 'OPTIONS') {
      // разрешаем кросс-доменные запросы любых типов (по умолчанию)
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      // завершаем обработку запроса и возвращаем результат клиенту
      return res.end();
    }
  }

  next();
});

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