import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import userService from '../../Service/user.service.js';
import { container } from '../DI/container.js';

export default class jwtHelper {

static user_Service = container.resolve('userService'); //check later should implement depency injection here too

static async verifyRefreshToken(userId){

    try {
      
        const UserId = await this.user_Service.findOne(userId)
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


}