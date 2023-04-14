import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {authenticateRefreshJwtToken} from '../middleware/authentications.js';
import { container } from '../../Infrastructure/DI/container.js';
//import userService from '../../Service/user.service.js';
import * as errors from '../../Infrastructure/Error/Errors.js';
import * as dotenv from 'dotenv'
dotenv.config()
import jwtHelper from '../../Infrastructure/Services/jwtHelper.js';
import JwtController from '../controller/Jwt.controller.js';

//const user_Service = container.resolve('userService') //check later should implement depency injection here too
const router = express.Router()

const secretKey = process.env.JWT_SECRET;
const refreshSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET;
const tokenExpirationTime = process.env.JWT_TOKEN_EXPIRATION_TIME;

// can imbed dependency injection for jwt if needed 

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

//route for generating jwt(Loging In)
router.post('/', JwtController.generateAccessToken)

router.post('/refresh-token', authenticateRefreshJwtToken, JwtController.generateRefreshToken)


export {router}

