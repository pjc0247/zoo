export const authEnv = {
  useRawPasswordOnDevelopment: process.env.USE_RAW_PASSWORD_ON_DEVELOPMENT === 'true',

  jwtSecret: process.env.JWT_SECRET,
} as AuthEnv;

interface AuthEnv {
  useRawPasswordOnDevelopment: boolean;

  jwtSecret: string;
}
export default AuthEnv;
