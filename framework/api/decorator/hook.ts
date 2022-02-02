import { appendMetadata } from './metadata';

export const preSave = () => {
  return (cls: any, method: any, desc: PropertyDescriptor) => {
    appendMetadata('preSave', cls, { method });
  };
};
export const postSave = () => {
  return (cls: any, method: any, desc: PropertyDescriptor) => {
    appendMetadata('postSave', cls, { method });
  };
};
