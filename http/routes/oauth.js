import express from 'express';
const router = express.Router()
import OauthController from '../controller/Oauth.controller.js';

//route for on_behalf user
router.get('/', OauthController.generateAuthUrl)

//rote for receiving calback from google
router.get('/oauthcallback', OauthController.oauthcallback)

//route for logingIn using refreshToken
router.post('/refresh-token', OauthController.refreshtoken)


export {router}
