import { Document } from 'mongoose';
import env from 'env';

import { IPost, Post } from 'model/post';
import { SearchableController } from './searchable_controller';

class PostController extends SearchableController<IPost> {
  static model = Post;

  static async create(document: Partial<IPost>) {
    const post = await Post.create({
      ...document,
    });
    return new PostController(post);
  }

  async toExportable() {
    return {
      id: this.id,

      title: this.doc.title,
      body: this.doc.body,
    };
  }
};
export default PostController;
