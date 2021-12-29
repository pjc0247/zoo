import bcrypt from 'bcrypt';
import env from '../env';

import { DevelopmentStage } from '../env/stage';
import { IPasswordEngine } from './password_engine';

export class DefaultPasswordEngine implements IPasswordEngine {
  async getHashedPassword(rawPassword: string) {
    if (env.stage === DevelopmentStage.Development
      && env.useRawPasswordOnDevelopment) {
      return rawPassword;
    } else {
      return await bcrypt.hash(rawPassword, 10);
    }
  }
  async verifyPassword(inputPassword: string, hashedPassword: string) {
    if (env.stage === DevelopmentStage.Development
      && env.useRawPasswordOnDevelopment) {

      if (inputPassword === hashedPassword)
        return true;
    }

    if (await bcrypt.compare(inputPassword, hashedPassword))
      return true;
    return false;
  }
};
