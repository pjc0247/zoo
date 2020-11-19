import fs from 'fs';
import path from 'path';
import env from 'env';
import { pick } from 'lodash';

if (env.logDirectory) {
  fs.mkdirSync(env.logDirectory, { recursive: true });
}

const getLogPath = (reqId: string) => {
  return path.join(env.logDirectory, `${reqId}.log`);
};
export const logRequest = (reqId: string, userId: string, req: any) => {
  if (!env.logDirectory) return;

  fs.writeFile(getLogPath(reqId), JSON.stringify({
    userId,
    request: {
      ...pick(req, [
        'params',
        'body',
        'query',
      ]),
    },
  }), () => {
    // no-op
  });
};
export const logResponse = (reqId: string, userId: string, res: any) => {
  if (!env.logDirectory) return;

  fs.appendFile(getLogPath(reqId), JSON.stringify({
    userId,
    response: {
      ...res,
    },
  }), () => {
    // no-op
  });
};
