export const dbEnv = {
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
  } as DbEnv;
  
  interface DbEnv {
    mongoConnectionString: string;
  }
  export default DbEnv;
  