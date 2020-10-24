import { Document } from 'mongoose';

class BaseController<TDoc extends Document> {
  protected doc: TDoc;

  constructor(doc: Document) {
    this.doc = doc as TDoc;
  }

  get id() {
    return this.doc.id;
  }

  static batchDestroy(ids: string[]) {
    
  }
  async destroy() {
    await this.doc.deleteOne();
  }
  async update(props) {
    await this.doc.updateOne({
      ...props,
    });
  }

  toExportable() {
    return {
      id: this.id,
    };
  }
}
export default BaseController;
