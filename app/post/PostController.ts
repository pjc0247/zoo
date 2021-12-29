import { SearchableController } from '@/framework/controller';
import { searchable } from '@/framework/search/decorator';

import { IPost, Post } from './PostModel';

@searchable('post')
export class PostController extends SearchableController<IPost> {
  static model = Post;

  async toExportable() {
    return {
      id: this.id,
      title: this.doc.title,
      body: this.doc.body,
      author: this.doc.author,
    };
  }
}
