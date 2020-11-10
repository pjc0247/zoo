import { Request } from '../src/api/request';
import Router from '../src/api/router';
import genspec from '../src/api/spec/gen';

const router = new Router('user');

router.get('/', (req) => {
  return 'hello';
});

class GetRequestBody {
  foo: string = 'a';
  bar: number;
}
router.post(GetRequestBody, '/foo', (req) => {
  return 'hello';
});

console.log(genspec());
