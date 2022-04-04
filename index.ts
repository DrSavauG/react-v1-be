require('dotenv').config();
const PORT = process.env.PORT || 65534;
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;
const express = require('express');
import { Request, Response } from 'express';

const promisifyExpress = require('promisify-express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
import api from './routes/api';

promisifyExpress(app);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src'));
app.use('/', api);

app.all('*', (req: Request, res: Response) => {
  res.sendStatus(404);
});



const start = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();