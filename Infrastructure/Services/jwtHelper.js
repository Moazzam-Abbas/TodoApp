import { OAuth2Client } from 'google-auth-library'
import * as dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import * as errors from '../../Infrastructure/Error/Errors.js'
//import userService from '../../Service/user.service.js';
import { container } from '../DI/container.js';

export default class jwtHelper {

//static user_Service = container.resolve('userService'); //check later should implement depency injection here too
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
   console.log(user)
   if (!user) {
     throw new errors.Unauthorized('Invalid username or password')
    // return res.status(400).send('Invalid username or password');
   }

   const validPassword = bcrypt.compareSync(password, user.result.password);
   if (!validPassword) {
     throw new errors.Unauthorized('Invalid username or password')
    // return res.status(400).send('Invalid username or password');
   }
  
   // Generate JWT token
   const token = jwt.sign({ userId: user.result.id }, jwtHelper.secretKey, { expiresIn: jwtHelper.tokenExpirationTime, algorithm: 'HS256'});
   const refreshToken = jwt.sign({ userId: user.result.id }, process.env.JWT_REFRESH_TOKEN_SECRET);

   jwt.verify(token, jwtHelper.secretKey, (err, decoded) => {
     if (err) {
       console.log('Token verification failed:', err);
     } else {
       console.log('Decoded token:', decoded);
       console.log('UserId from token:', decoded.userId);
     }
   });

  return { 'access_token' : `Bearer ${token}`, 'refresh_token' : `Bearer ${refreshToken}`}
}

static async generateRefreshToken(req){
  const token = jwt.sign({ userId: req.userId }, jwtHelper.secretKey, { expiresIn: jwtHelper.tokenExpirationTime, algorithm: 'HS256'});
  return { 'access_token' : `Bearer ${token}`}
}

}
