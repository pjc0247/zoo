:penguin: zoo :penguin:
====
Batteries-included mobile app server framework.

Features
----
* Async support
* Push Notification
* Built-in Social Logins
* Production-Ready text searching, powered by [algolia](https://www.algolia.com/).


Routing
----
```js
@api('/user')
class UserApi {
  constructor(private user: UserController) {
  }
  
  @get('/me')
  async getMe(req: EmptyRequest) {
    return {
      user: this.user.get(req.user.id),
    };
  }
  
  
  @post('/')
  async createUser(req: CreateUserRequest) {
    return {
      user: this.user.create({
        ...req.body,
      });
    };
  }
}
```

bbbb
----

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
  
  someNonSeachableData: string;
}

@searchable('post')
class PostController extends Controller {

}
```
```ts
const posts = await PostController.search('query string');
```

Task
----
```ts
InlineTask.runRetriableTask(() => {
  await MAY_UNSTABLE_THIRDPARTY_API_CALL_HERE();
}, MAX_RETRY, INTERVAL);
```
