import express from 'express';
const router = express.Router()
import googleAuth from '../Helpers/googleAuth.js';

// can imbed dependency injection for googleAuth if needed 

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

//route for on_behalf user
router.get('/', (req, res) => {
   const authUrl = googleAuth.generateAuthUrl()
   console.log(`Visit this URL to authorize the app: ${authUrl}`);
   res.send(`Visit this URL to authorize the app: ${authUrl}`);
})

router.get('/oauthcallback', async (req, res) => {
     const { code } = req.query;
     const  tokens  = await googleAuth.generateAccessToken(code)
     res.send(tokens);
})

router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    // Validate the refresh token
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token missing' });
    }
  
    // Generate a new access token
    const accessToken = await googleAuth.refreshAccessToken(refreshToken);
  
    // Return the new access token to the client
    return res.json(`Bearer ${accessToken}`);
})



export {router}