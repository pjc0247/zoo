function searchable(indexName: string) {
  return function(cls: any) {
    console.log(cls);
  };
}

@searchable('asdf')
class Boo {

}