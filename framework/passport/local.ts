import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserController from '../controller/UserController';

passport.use(
  new LocalStrategy(
    async (
      email: string,
      password: string,
      done: (err: any, user: any) => void
    ) => {
      const user = await UserController.find(email);
      if (user) {
        if (user.verifyPassword(password)) done(null, user);
        else done('Invalid password', null);
      } else {
        done('User does not exist', null);
      }
    }
  )
);
