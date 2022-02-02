export enum DatabaseHookKind {
  PreSave = 'preSave',
  PostSave = 'postSave',
}

export interface IDatabaseHook {
  kind: DatabaseHookKind;
  method: (doc: any) => void | Promise<void>;
}
