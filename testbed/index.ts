import dotenv from 'dotenv';
dotenv.config(); //TODO

import { Schema, model, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { Request } from '../src/api/request';
import Router from '../src/api/router';
import genspec from '../src/api/spec/gen';
import '../src/model';

import { SearchableController } from '../src/controller';
import { algolia } from '../src/search';
import { searchable } from '../src/search/decorator';
import { api } from '../src/api/';
import { get } from '../src/api/';
import { applyRouters } from 'api/express';

interface IPost extends Document {
  title: string;
  body: string;
};
export const postSchema = new Schema({
  title: String,
  body: String,
});
postSchema.plugin(mongoosePaginate);
export const Post = model('Post', postSchema);

@searchable('post')
class PostController extends SearchableController<IPost> {
  static model = Post;
}

/*
const post = new PostController(null, algolia.initIndex('test'));
post.create({
  title: 'asdf',
  body: 'qwer',
});

post.search('asd').then(x => console.log(x));
*/

const router = new Router('user');

router.get('/', (req) => {
  return 'hello';
});

class GetRequestBody {
  foo: string = 'a';
  bar: number;
}
router.post(GetRequestBody, '/foo', (req) => {

  return 'hello';
});

@api('/user')
class User {
  @get('/')
  async getUser() {
    return "hello";
  }
}


// for test
const express = require('express');
const app = express();
const port = 3000

applyRouters(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});