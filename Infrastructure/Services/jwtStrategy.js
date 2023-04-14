import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt as ExtractJwt } from 'passport-jwt';
import jwtHelper from './jwtHelper.js';
import * as dotenv from 'dotenv'
dotenv.config()

const secretKey = process.env.JWT_SECRET;
const refreshSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
  failWithError: true
};

const jwtStrategy = new JwtStrategy(options, (jwt_payload, done) => {
  // Check if the token has expired
  const expirationDate = new Date(jwt_payload.exp * 1000);
  if (expirationDate < new Date()) {
    console.log("token: expired")
    return done(null, false);
  }

  // Return the user object
  return done(null, jwt_payload.userId);
});


const optionsRefreshStartegy = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: refreshSecretKey,
  failWithError: true
};

const refreshStrategy = new JwtStrategy(optionsRefreshStartegy, async (jwt_payload, done) => {
  
  //kept below comment for later use
  //console.log("RefreshToken in refreshStartegy "+ExtractJwt.fromAuthHeaderAsBearerToken()(jwt_payload.req))
  try {
    // Verify the refresh token in the database
    const {userId} = await jwt_payload;
    const isValid = await jwtHelper.verifyRefreshToken(userId);
    if (!isValid) {
      return done(null, false);
    }
  // If the refresh token is valid, return the user ID to Passport.js
    return done(null, userId);
  } catch (error) {
    return done(error);
  }
});

export {jwtStrategy, refreshStrategy}

