// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const {handleErrors} = require('./middlewares/handleErrors');
const rootRouter = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

// app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use('/', rootRouter)

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT);
