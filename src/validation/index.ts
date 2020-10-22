import 'reflect-metadata';

const getPropertyType = (cls: any, property: string) => {
  return Reflect.getMetadata('design:type', cls, property).name;
};

function constraint(...validators: validator[]) {
  return function(cls: any, property: string) {
    const type = getPropertyType(cls, property);
  };
}

export type validator = (input: any) => boolean;

function number() {
  return (input: any) => {
    return true;
  }
}

class Foo {
  @constraint(number())
  a: number;
}

new Foo();