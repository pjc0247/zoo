function foo() {
  console.log(this.boo);
};

const boundFoo = foo.bind({
  boo: 1234
});
boundFoo();
