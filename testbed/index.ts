import dotenv from 'dotenv';
dotenv.config(); //TODO

import { Schema, model, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { Request } from '../src/api/request';
import Router from '../src/api/router';
import genspec from '../src/api/spec/gen';
import '../src/model';

import { BaseController, SearchableController } from '../src/controller';
import { algolia } from '../src/search';
import { searchable } from '../src/search/decorator';
import { api, middleware, post } from '../src/api/';
import { get } from '../src/api/';
import { applyRouters } from 'api/express';
import { RetriableTask } from 'task/retriable_task';
import { InlineTask } from 'task';

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
class Post2Controller extends BaseController<IPost> {
  static model = Post;
}

class AA extends RetriableTask {
  execute() {
    console.log('AA');
    throw new Error('1');
  }
}

InlineTask.runRetriableTask(() => {
  console.log('aa');
  throw new Error('1');
}, 10, 10);

(new AA()).beginTask();

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

@middleware()
class Middleware {
  async execute(request: Request<any>, next: Function) {
    try {
    const ret = await next();
    return { a: ret };
    } catch(e) {
      return 'err';
    }
  }
}

@api('/user')
class User {
  constructor(private post: PostController) {
    console.log(post);
  }

  @get('/')
  async getUser() {
    throw new Error('a');
    return {
      a: 'hello'
    };
  }

  @post('/f')
  async postF(req: Request<any>) {
    console.log(req);
  }
};

// for test
const express = require('express');
const app = express();
const port = 3000

app.use(express.json());
applyRouters(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});