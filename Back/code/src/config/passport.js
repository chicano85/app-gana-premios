const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const userService = require('../features/api/user/user.service');

const config = require('.');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = config.jwt.public;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      const expirationDate = new Date(jwtPayload.exp * 1000);
      if (expirationDate < new Date()) {
        return done(null, false);
      }

      if (jwtPayload.type === 'user') {
        try {
          const user = await userService.getUser(jwtPayload.uuid);
          if (user.deleted) {
            return done(
              null,
              {
                status: false,
                message: 'El usuario ha sido eliminado del sistema.',
              },
              jwtPayload.type,
            );
          }
          if (!user.active) {
            return done(
              null,
              {
                status: false,
                message: 'El usuario tiene el acceso restringido.',
              },
              jwtPayload.type,
            );
          }
          return done(user, null, jwtPayload.type);
        } catch (e) {
          return done(null, { status: false, message: 'El usuario no existe.' }, jwtPayload.type);
        }
      }

      return done(null, false);
    }),
  );
};
