import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt as ExtractJwt } from 'passport-jwt';
const secretKey = process.env.JWT_SECRET;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey
};

passport.use(new JwtStrategy(options, function (jwt_payload, done) {
  // Check if the token has expired
  const expirationDate = new Date(jwt_payload.exp * 1000);
  if (expirationDate < new Date()) {
    return done(null, false);
  }

  // Return the user object
  return done(null, jwt_payload);
}));