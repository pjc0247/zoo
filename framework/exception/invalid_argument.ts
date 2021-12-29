import BaseException from './base_exception';

class InvalidArgumentException extends BaseException {
  constructor(name: string) {
    super(`invalid argument: ${name}`, 400);
  }
}
export default InvalidArgumentException;
