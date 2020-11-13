import AuthEnv, { authEnv } from './auth';
import DbEnv, { dbEnv } from './db';
import StageEnv, { stageEnv } from './stage';

interface Env extends
  StageEnv,
  AuthEnv,
  DbEnv
{}

const env = {
  ...stageEnv,
  ...authEnv,
  ...dbEnv,
} as Env;
export default env;
