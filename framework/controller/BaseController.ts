import { Document, Model } from 'mongoose';

export class BaseController<TDoc extends Document> {
  protected doc: TDoc;

  static model: any;

  constructor(doc: Document) {
    this.doc = doc as TDoc;
  }

  get model(): Model<TDoc> {
    return (<any>this).constructor.model;
  }
  get id() {
    return this.doc?.id;
  }

  // Create a controller instance from given mongoose doc.
  protected fromDoc(doc: any) {
    return new (<any>this.constructor)(doc);
  }
  // Create multiple controllers instance from given mongoose docs.
  protected fromDocs(docs: any[]) {
    return docs.map((x) => this.fromDoc(x));
  }

  async create(object: Partial<TDoc>) {
    return this.fromDoc(await this.model.create(object as any));
  }

  async get(id: string): Promise<this> {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return this.fromDoc(doc);
  }
  async getMany(ids: string[]): Promise<this[]> {
    const docs = await this.model.where('_id').in(ids).find();
    return this.fromDocs(docs);
  }
  async find(condition: any) {
    const doc = await this.model.findOne(condition);
    if (!doc) return null;
    return this.fromDoc(doc);
  }
  async findMany(condition: any, limit: number) {
    const docs = await this.model.find(condition).limit(limit).exec();
    return this.fromDocs(docs);
  }

  async batchDestroy(ids: string[]) {}
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
