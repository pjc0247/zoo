import { api, get, post, Request } from '@/framework/api';

import { PostController } from './PostController';

@api('/post')
export class Post {
  constructor(private post: PostController) {}

  @get('/')
  async getPosts() {
    throw new Error('a');
    return {
      a: 'hello',
    };
  }
  @get('/:id')
  async getPost() {
    throw new Error('a');
    return {
      a: 'hello',
    };
  }

  @post('/')
  async create(req: Request<any>) {
    console.log(this.post);
    const post = await this.post.create(req.body);
    console.log('re', post);
    return post;
  }
}
