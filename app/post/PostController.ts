import { SearchableController, useController } from '@/framework/controller';
import { searchable } from '@/framework/search/decorator';
import { CommentController } from './CommentController';
import { IComment } from './CommentModel';
import { IPost, Post } from './PostModel';

@searchable('post')
export class PostController extends SearchableController<IPost> {
  static model = Post;

  constructor(private comment: CommentController) {
    super();
  }

  async getComments() {
    const comment = useController(CommentController);
    return await comment.findMany({ post: this.id }, 100);
  }

  async createComment(data: Partial<IComment>) {
    const comment = useController(CommentController);
    return await comment.create({
      ...data,
      post: this.id,
    });
  }

  async toExportable() {
    return {
      id: this.id,
      title: this.doc.title,
      body: this.doc.body,
      author: this.doc.author,
    };
  }
}
