import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import env from 'env';

import UserController from 'controller/user';

const opts = {} as any;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = env.jwtSecret;

passport.use(new JwtStrategy(opts, async (payload, done) => {
  console.log(payload);
  const {
    id,
  } = payload;

  const user = await UserController.get(id);
  if (user) {
    done(null, user);
  } else {
    done('User not exist', null);
  }
}));
