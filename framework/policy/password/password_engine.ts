export interface IPasswordEngine {
  getHashedPassword(rawPassword: string): Promise<string>;
  verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean>;
};
