export enum DevelopmentStage {
  Development = 'development',
  InHouse = 'inhouse',
  Production = 'production',
}

export const stageEnv = {
  stage: process.env.STAGE,
} as StageEnv;

interface StageEnv {
  stage: DevelopmentStage;
}
export default StageEnv;
