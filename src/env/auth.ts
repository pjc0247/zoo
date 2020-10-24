export const authEnv = {
  jwtSecret: process.env.JWT_SECRET,
} as AuthEnv;

interface AuthEnv {
  jwtSecret: string;
}
export default AuthEnv;
