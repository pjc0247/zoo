import fs from 'fs';
import path from 'path';
import env from 'env';
import { pick } from 'lodash';

if (env.logDirectory) {
  fs.mkdirSync(env.logDirectory, { recursive: true });
}

const ensureLogDir = (reqId: string, userId: string) => {
  fs.mkdirSync(path.join(env.logDirectory, userId || '_'));
};
const getLogPath = (reqId: string, userId: string) => {
  return path.join(env.logDirectory, userId || '_', `${reqId}.log`);
};
export const logRequest = (reqId: string, userId: string, req: any) => {
  if (!env.logDirectory) return;

  ensureLogDir(reqId, userId);
  fs.writeFile(getLogPath(reqId, userId), JSON.stringify({
    userId,
    request: {
      ...pick(req, [
        'params',
        'body',
        'query',
      ]),
    },
  }, null, 2) + '\r\n\r\n', () => {
    // no-op
  });
};
export const logResponse = (reqId: string, userId: string, res: any) => {
  if (!env.logDirectory) return;

  ensureLogDir(reqId, userId);
  fs.appendFile(getLogPath(reqId, userId), JSON.stringify({
    userId,
    response: res,
  }, null, 2), () => {
    // no-op
  });
};
