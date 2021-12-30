import mongoose from 'mongoose';

import { applyRouters } from '@/framework/api/express';

import './post/PostApi';
import './post/NotificationApi';
import { useController } from '@/framework/controller';
import { PostController } from './post';

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

const post = useController(PostController);
const gg = async () => {
  console.log((await post.search('안')).map((x) => x.toExportable()));
};
gg().catch(console.error);
