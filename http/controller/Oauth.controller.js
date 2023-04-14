import googleAuth from '../../Infrastructure/Services/googleAuth.js';

export default class OauthController {

    static async generateAuthUrl(req, res, next) {
      // Validate incoming request data
      try {
        const authUrl = googleAuth.generateAuthUrl()
        console.log(`Visit this URL to authorize the app: ${authUrl}`);
        res.status(200).send(`Visit this URL to authorize the app: ${authUrl}`);
      } catch (error) {
        next(error);
      }
    }
    
    static async oauthcallback(req, res, next) {
      // Validate incoming request data
      try {
        const { code } = req.query;
        const  tokens  = await googleAuth.generateAccessToken(code)
        res.status(200).send(tokens);
     } catch (error) {
         next(error);
     }
    }

    static async refreshtoken(req, res, next) {
      // Validate incoming request data
      try {
        const refreshToken = req.headers.authorization.split(' ')[1];;
        // Validate the refresh token
        if (!refreshToken) {
          return res.status(400).json({ error: 'Refresh token missing' });
        }
      
        // Generate a new access token
        const accessToken = await googleAuth.refreshAccessToken(refreshToken);
      
        // Return the new access token to the client
        return res.status(200).json(`oauth ${accessToken}`);
      } catch (error) {
        next(error);
      }
    }


}
