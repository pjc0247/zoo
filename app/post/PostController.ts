import { SearchableController } from '@/framework/controller'
import { IPost, Post } from '@/framework/model/post'
import { searchable } from '@/framework/search/decorator'

@searchable('post')
export class PostController extends SearchableController<IPost> {
  static model = Post

  async toExportable() {
    return {
      id: this.id,
      title: this.doc.title,
      body: this.doc.body,
    }
  }
}
