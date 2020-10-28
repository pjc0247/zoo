:penguin: zoo :penguin:
====



__from__
```ts
class GetPostRequest extends Request<{
  id: string;
}> {
  @from('id')
  post: Post;
};
post.get('/:id', (req: GetPostRequest) => {
  return {
    post: req.post,
  };
});
```


__search__
```ts
class Post {
  @searchable()
  title: string;
  @searchable()
  content: string;
}

@searchable('post')
class PostController extends Controller {

}
```
```ts
const posts = await PostController.search('query string');
```
