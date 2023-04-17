import axios from 'axios'
import passport from 'passport';

function isAuthenticated (req, res, next) {
    if (req.session.user) next()
    else res.send("Please login first to access")
}

async function authenticateOAuth2 (req, res, next) {

    const clientId = process.env.Google_Client_ID
    const token = req.headers.authorization.split(' ')[1];
    const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`;

    try {
        const response = await axios.get(url);
        console.log("Google OAuth: Full Response Token Validity object => "+JSON.stringify(response.data))
        const data = response.data;
        // Check if the token is still valid and the user is signed in
        if (data.aud === clientId && !data.error) {
          console.log('Google OAuth: Token is valid successfully authenticated')
          next();
        } else {
          res.status(401).send('Invalid Token kindly Login first');
        }
      } catch (error) {
        console.log("Google OAuth: Failure Reason => "+JSON.stringify(error.message))
        res.status(401).send("Invalid Token or Authentication Failure Kindly Login");
      }

}

async function authenticateJwt (req, res, next) {

  passport.authenticate('jwt', { session: false, failureMessage: true }, (err, user, info) => {
    if (err) {
      console.log("JWT Auth: Failure Reason => "+err)
      return next(err);
    }
    if (!user) {
      console.log("JWT Auth: Failure Reason => User Not Found "+user)
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = user;
    console.log('JWT Auth: Token is valid successfully authenticated')
    next();
  })(req, res, next);

}

async function authenticateRefreshJwtToken (req, res, next) {

  passport.authenticate('refresh', { session: false, failureMessage: true }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log("in authentication Refresh midddleware "+user)
    req.userId = user;
    next();
  })(req, res, next);

}

async function authenticate (req, res, next) {

  const [authType, token] = req.headers.authorization.split(' ');

  if (!authType) {
    return res.status(401).send('Unauthorized');
  }
  
  console.log("Authentication Mode : "+authType)

  if (authType.startsWith('oauth')) {
    // Authentication logic for OAuth 2.0
    authenticateOAuth2(req, res, next)

  } else if (authType.startsWith('Bearer')){
    // Authentication logic for bearer tokens
    authenticateJwt(req, res, next)

  } else {
    return res.status(401).send('Unauthorized no authentication Type provided');
  }

  //next();

}


export {authenticateOAuth2, authenticateJwt, authenticateRefreshJwtToken, authenticate}
