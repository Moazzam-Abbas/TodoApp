import * as dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import * as errors from '../../Infrastructure/Error/Errors.js'
import { container } from '../DI/container.js';
import IAuthenticationService from '../../Domain/Abstractions/IAuthenticationService.js'

export default class jwtHelper extends IAuthenticationService{

static userRepo = container.resolve('userRepo')
static secretKey = process.env.JWT_SECRET;
static refreshSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET;
static tokenExpirationTime = process.env.JWT_TOKEN_EXPIRATION_TIME;

static async verifyRefreshToken(userId){

    try { 
      const UserId = await jwtHelper.userRepo.findOne(userId)
      // Check if decoded token contains the correct properties
      if (!UserId) {
        throw new Error('Invalid refresh token');
      }
      return UserId;
    } catch (err) {
        // Handle errors
        if (err.name === 'TokenExpiredError') {
          throw new Error('Refresh token expired');
        } else {
          throw new Error('Invalid refresh token');
        }
      }
}

static async generateAccessToken(req){

   // Verify user credentials
   const { userName, password } = req.body;
   const user = await jwtHelper.userRepo.findOneByUserName(userName)
   if (!user) {
     throw new errors.Unauthorized('Invalid username or password')
   }

   const validPassword = bcrypt.compareSync(password, user.result.password);
   if (!validPassword) {
     throw new errors.Unauthorized('Invalid username or password')
   }
  
   // Generate JWT token
   const token = jwt.sign({ userId: user.result.id }, jwtHelper.secretKey, { expiresIn: jwtHelper.tokenExpirationTime, algorithm: 'HS256'});
   const refreshToken = jwt.sign({ userId: user.result.id }, process.env.JWT_REFRESH_TOKEN_SECRET);

   jwt.verify(token, jwtHelper.secretKey, (err, decoded) => {
     if (err) {
      throw new errors.Unauthorized('Token verification failed:')
     }
   });
  return { 'access_token' : `Bearer ${token}`, 'refresh_token' : `Bearer ${refreshToken}`}
}

static async refreshAccessToken(req){
  const token = jwt.sign({ userId: req.userId }, jwtHelper.secretKey, { expiresIn: jwtHelper.tokenExpirationTime, algorithm: 'HS256'});
  return { 'access_token' : `Bearer ${token}`}
}

}
