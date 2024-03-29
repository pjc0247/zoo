import { Document, Model } from 'mongoose';

import { ZooModel } from '@/model';

export class BaseController<TDoc extends ZooModel> {
  protected doc: TDoc;

  static schema: any;
  static model: any;

  set(doc: Document) {
    this.doc = doc as TDoc;
  }

  get model(): Model<TDoc> {
    return (<any>this).constructor.model;
  }
  get id() {
    return this.doc?.id;
  }

  // Create a controller instance from given mongoose doc.
  protected fromDoc(doc: any): this {
    const instance = new (<any>this.constructor)();
    instance.set(doc);
    return instance;
  }
  // Create multiple controllers instance from given mongoose docs.
  protected fromDocs(docs: any[]) {
    return docs.map((x) => this.fromDoc(x));
  }

  async create(object: Partial<TDoc>) {
    const createdDocument = await this.model.create(object as any);
    return this.fromDoc(createdDocument);
  }

  query() {
    return this.model;
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
  async find(condition: any): Promise<this> {
    const doc = await this.model.findOne(condition);
    if (!doc) return null;
    return this.fromDoc(doc);
  }
  async findMany(condition: any, limit: number): Promise<this[]> {
    const docs = await this.model.find(condition).limit(limit).exec();
    return this.fromDocs(docs);
  }

  async destroy() {
    return await this.doc.deleteOne();
  }
  async destroyMany(ids: string[]) {
    return await this.model.where('_id').in(ids).remove();
  }

  async update(props: Partial<TDoc>) {
    return await this.doc.updateOne({
      ...props,
    });
  }

  /* Hooks */
  async onBeforeSave() {}
  async onAfterSave() {}
  async onRemove() {}

  /* Export */
  async toExportable() {
    return {
      id: this.id,
    };
  }
}
