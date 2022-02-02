import { SearchableController } from '@/framework/controller';
import { searchable } from '@/framework/search/decorator';
import { controller, postSave } from '@/framework/api/decorator';

import { IPost, Post } from './PostModel';
import { IComment, commentSchema } from './CommentModel';

@controller('comment')
@searchable('comment')
export class CommentController extends SearchableController<IComment> {
  static schema = commentSchema;

  @postSave()
  postSave() {
    console.log('Post Save');
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
