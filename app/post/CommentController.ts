import { SearchableController } from '@/framework/controller';
import { searchable } from '@/framework/search/decorator';

import { IPost, Post } from './PostModel';
import { IComment, Comment } from './CommentModel';

@searchable('comment')
export class CommentController extends SearchableController<IComment> {
  static model = Comment;

  async toExportable() {
    return {
      id: this.id,
      title: this.doc.title,
      body: this.doc.body,
      author: this.doc.author,
    };
  }
}
