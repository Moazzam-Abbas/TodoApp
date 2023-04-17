import express from 'express';
import {authenticateRefreshJwtToken} from '../middleware/authentications.js';
import * as dotenv from 'dotenv'
dotenv.config()
import JwtController from '../controller/Jwt.controller.js';

const router = express.Router()

//route for generating jwt(Loging In)
router.post('/', JwtController.generateAccessToken)

//route for generating jwt(Loging In) based on refreshToken
router.post('/refresh-token', authenticateRefreshJwtToken, JwtController.refreshAccessToken)

export {router}

