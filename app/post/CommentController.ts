import { SearchableController } from '@/controller';
import { searchable } from '@/search/decorator';
import { controller, postSave } from '@/api/decorator';

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
