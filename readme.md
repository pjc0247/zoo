:penguin: zoo :penguin:
====
Batteries-included mobile app server framework.

개요
----
* nestjs의 버전 2 같은걸 만드는게 아닙니다.
* express는 원하는걸 하기에 너무 bare 한 상태이고, nestjs는 너무 나가서 무거운 상태라 적당한 인터페이스를 만듭니다.
* (프레임워크로써의) 인터페이스 제공은 부수적인 기능이고, 주 목적은 `Batteries-included`
* 일반적인 로그인과 게시판 푸시 발송은 그냥 클론해서 켜면 되는 정도가 목표

할일
-----
* 푸시 발송에 대한 자동 알림 목록 생성 (알림 히스토리)
* 파이어베이스 유저 연동
* 공지사항
* 게시판
  * 댓글
  * 알림
* hook

Features
----
* Async support
* Push Notification with production-ready APIs.
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
__CronTask__
```ts
@schedule('every 1 hour')
class CronTask extends Task {
  execute() {
    console.log('Hello Task!');
  }
}
```

__RetriableTask__
```ts
InlineTask.runRetriableTask(() => {
  await MAY_UNSTABLE_THIRDPARTY_API_CALL_HERE();
}, MAX_RETRY, INTERVAL);
```
