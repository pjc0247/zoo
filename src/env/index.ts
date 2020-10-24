import AuthEnv, { authEnv } from './auth';
import StageEnv, { stageEnv } from './stage';

interface Env extends
  StageEnv,
  AuthEnv
{}

const env = {
  ...stageEnv,
  ...authEnv,
} as Env;
export default env;
