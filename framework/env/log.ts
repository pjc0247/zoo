export const logEnv = {
  logDirectory: process.env.LOG_DIRECTORY,
} as LogEnv;

interface LogEnv {
  logDirectory: string;
}
export default LogEnv;
