:penguin: zoo :penguin:
====
Batteries-included mobile app server framework.

Features
----
* Async support
* Push Notification
* Built-in Social Logins
* Production-Ready text searching, powered by [algolia](https://www.algolia.com/).

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
