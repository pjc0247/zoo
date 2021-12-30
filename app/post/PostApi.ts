import { api, get, post, Request } from '@/framework/api';
import { CommentController } from '.';

import { PostController } from './PostController';

@api('/post')
export class Post {
  constructor(
    private post: PostController,
    private comment: CommentController
  ) {}

  @get('/')
  async getPosts() {
    return this.post.findMany({}, 20);
  }
  @get('/:id')
  async getPost(req: Request<any>) {
    const post = await this.post.get(req.params.id);
    return post;
  }

  @post('/')
  async create(req: Request<any>) {
    const post = await this.post.create(req.body);
    return post;
  }

  @get('/:id/comment')
  async getComments(req: Request<any>) {
    const post = await this.post.get(req.params.id);
    return post.getComments();
  }

  @post('/:id/comment')
  async createComment(req: Request<any>) {
    const post = await this.post.get(req.params.id);
    const comment = await post.createComment(req.body);
    return comment;
  }
}
