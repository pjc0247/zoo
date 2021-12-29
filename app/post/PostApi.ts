import { api, get, post, Request } from '@/framework/api';

import { PostController } from './PostController';

@api('/post')
export class Post {
  constructor(private post: PostController) {
    console.log(post);
  }

  @get('/')
  async getUser() {
    throw new Error('a');
    return {
      a: 'hello',
    };
  }

  @post('/')
  async create(req: Request<any>) {
    console.log(req);
  }
}
