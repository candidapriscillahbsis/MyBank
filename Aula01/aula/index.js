import express from 'express';
import winston from 'winston';
import accountsRouter from '../routes/accounts.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

global.fileName = 'accounts.json';

const { combine, timestamp, label, printf } = winston.format;
const myformat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'mybank.log' }),
  ],

  format: combine(label({ label: 'mybank' }), timestamp(), myformat),
});

const app = express();
app.use(express.json());

app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    logger.info('API SUCESS!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        logger.info('API SUCESS and file Created!');
      })
      .catch((err) => {
        logger.error(err);
      });
  }
});
