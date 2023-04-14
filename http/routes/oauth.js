import express from 'express';
const router = express.Router()
import googleAuth from '../../Infrastructure/Services/googleAuth.js';
import OauthController from '../controller/Oauth.controller.js';

// can imbed dependency injection for googleAuth if needed 

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

//route for on_behalf user
router.get('/', OauthController.generateAuthUrl)

router.get('/oauthcallback', OauthController.oauthcallback)

router.post('/refresh-token', OauthController.refreshtoken)


export {router}
