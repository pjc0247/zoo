import { SearchableController } from '@/framework/controller';
import { searchable } from '@/framework/search/decorator';
import { controller, postSave } from '@/framework/api/decorator';

import { IPost, Post } from './PostModel';
import { IComment, Comment } from './CommentModel';

@controller()
@searchable('comment')
export class CommentController extends SearchableController<IComment> {
  static model = Comment;

  @postSave()
  postSave() {}

  async toExportable() {
    return {
      id: this.id,
      title: this.doc.title,
      body: this.doc.body,
      author: this.doc.author,
    };
  }
}
