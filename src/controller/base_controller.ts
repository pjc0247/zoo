import { Document, Model } from 'mongoose';

class BaseController<TDoc extends Document> {
  protected doc: TDoc;

  static model: Model<any>;

  constructor(doc: Document) {
    this.doc = doc as TDoc;
  }

  get model() {
    return ((<any>this).constructor.type);
  }
  get id() {
    return this.doc.id;
  }

  static async get(id: string) {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return new (<any>this.constructor)(doc);
  }
  static async find(condition: any) {
    const doc = await this.model.findOne(condition);
    if (!doc) return null;
    return new (<any>this.constructor)(doc);
  }
  static async findMany(condition: any, limit: number) {
    const docs = await this.model
      .find(condition)
      .limit(limit)
      .exec();
    return docs.map(x => new (<any>this.constructor)(x));
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
