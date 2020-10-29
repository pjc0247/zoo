class BaseException extends Error {
  constructor(msg: string, public statusCode: number = 500) {
    super(msg);
  }
}
export default BaseException;
