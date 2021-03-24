import express from 'express';
import accountsRouter from '../routes/accounts.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

global.fileName = "accounts.json";

const app = express();
app.use(express.json());

app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    console.log('API SUCESS!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        console.log('API SUCESS and file Created!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
