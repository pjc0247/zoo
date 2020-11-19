import AuthEnv, { authEnv } from './auth';
import DbEnv, { dbEnv } from './db';
import LogEnv, { logEnv } from './log';
import StageEnv, { stageEnv } from './stage';

interface Env extends
  StageEnv,
  AuthEnv,
  DbEnv,
  LogEnv
{}

const env = {
  ...stageEnv,
  ...authEnv,
  ...dbEnv,
  ...logEnv,
} as Env;
export default env;
