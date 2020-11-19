import { Document, Model } from 'mongoose';

export class BaseController<TDoc extends Document> {
  protected doc: TDoc;

  static model: any;

  constructor(doc: Document) {
    this.doc = doc as TDoc;
  }

  get model() {
    return ((<any>this).constructor.model);
  }
  get id() {
    return this.doc?.id;
  }

  // Create a controller instance from given mongoose doc.
  protected from_doc(doc: any) {
    return new (<any>this.constructor)(doc);
  }
  // Create multiple controllers instance from given mongoose docs.
  protected from_docs(docs: any[]) {
    return docs.map(x => this.from_doc(x));
  }

  async create(object: Partial<TDoc>) {
    return this.from_doc(await this.model.create(object));
  }

  async get(id: string) {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return this.from_doc(doc);
  }
  async find(condition: any) {
    const doc = await this.model.findOne(condition);
    if (!doc) return null;
    return this.from_doc(doc);
  }
  async findMany(condition: any, limit: number) {
    const docs = await this.model
      .find(condition)
      .limit(limit)
      .exec();
    return this.from_docs(docs);
  }

  async batchDestroy(ids: string[]) {
  }
  async destroy() {
    return await this.doc.deleteOne();
  }
  async update(props: Partial<TDoc>) {
    return await this.doc.updateOne({
      ...props,
    });
  }

  async toExportable() {
    return {
      id: this.id,
    };
  }
}
