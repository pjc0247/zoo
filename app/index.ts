import mongoose from 'mongoose';

import { applyRouters } from '@/framework/api/express';

import './post/PostApi';

// for test
const express = require('express');
const app = express();
const port = 3000;

// TODO :
mongoose.connect(
  'mongodb+srv://test1:asdfasdf@cluster0.m2rk2.mongodb.net/Clustor0?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  }
);

app.use(express.json());
applyRouters(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
